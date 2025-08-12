from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from datetime import datetime, timezone, date

from sqlalchemy import or_, func

from ..models import db
from ..models.pomodoro import PomodoroSession

pomodoro = Blueprint("pomodoro", __name__, url_prefix="/api/pomodoro")


@pomodoro.route('/', methods=['GET'])
@jwt_required()
def get_active_session():
    session = PomodoroSession.query.filter(
        or_(
            PomodoroSession.status == "active",
            PomodoroSession.status == "paused"
        )
    ).first()

    if not session:
        return jsonify({"session_id": "", "time": 0, "status":""}), 200
    
    elapsed = datetime.now() - session.start_time
    if session.status == "active":
        elapsed = elapsed.seconds - session.pause_time
    else:
        elapsed = session.elapsed
    
    return jsonify({
        "session_id": session.id, 
        "session_type": session.session_type,
        "duration": session.duration,
        "time": elapsed, 
        "status": session.status,
        "last_pause": session.last_pause.isoformat() + "Z" if session.last_pause else None
    }), 200


@pomodoro.route('/start', methods=['POST'])
@jwt_required()
def start_session():
    user_id = get_jwt_identity()

    existing_session = PomodoroSession.query.filter_by(user_id=user_id, status="active").first()
    if existing_session:
        return jsonify({"error": "Active session already exists"}), 400

    new_session = PomodoroSession(
        user_id = user_id,
        start_time = datetime.now(),
        session_type = request.json.get("session_type", "focus"),
        duration = request.json.get("duration", 0),
        elapsed = 0,
        pause_time = 0,
        status="active"
    )

    db.session.add(new_session)
    db.session.commit()

    return jsonify({"message": "Pomodoro started", "session_id": new_session.id}), 201
    
    
@pomodoro.route('/end/<int:session_id>', methods=['POST'])
@jwt_required()
def end_session(session_id):
    session = PomodoroSession.query.get(session_id)

    if not session:
        return jsonify({"error": "Session not found"}), 404
    
    if session.status != "active":
        return jsonify({"error": "Session already ended"}), 400

    session.end_time = datetime.now()
    session.status = "completed"

    db.session.commit()

    return jsonify({"message": "Pomodoro ended", "duration": session.duration}), 200


@pomodoro.route('/pause/<int:session_id>', methods=['POST'])
@jwt_required()
def pause_session(session_id):
    session = PomodoroSession.query.get(session_id)

    if not session:
        return jsonify({"error": "Session not found"}), 404
    
    if session.status == "paused":
        return jsonify({"error": "Session already pause"}), 400

    if not request.json.get('time'):
        return jsonify({"error": "Missing time"}), 400
    
    session.status = "paused"
    # Store elapsed time as seconds into session.duration
    elapsed = request.json.get('time')
    session.elapsed = elapsed
    session.last_pause = datetime.now(timezone.utc)
    db.session.commit()

    return jsonify({"message": "Pomodoro paused", "duration": session.elapsed}), 200


@pomodoro.route('/resume/<int:session_id>', methods=['POST'])
@jwt_required()
def resume_session(session_id):
    session = PomodoroSession.query.get(session_id)

    if not session:
        return jsonify({"error": "Session not found"}), 404
    
    if session.status != "paused":
        return jsonify({"error": "Session is running or ended"}), 400

    session.status = "active"
    session.pause_time += request.json.get("time")
    db.session.commit()

    return jsonify({"message": "Pomodoro resumed"}), 200


@pomodoro.route('/<int:session_id>', methods=['DELETE'])
@jwt_required()
def cancel_session(session_id):
    session = PomodoroSession.query.get(session_id)

    if not session:
        return jsonify({"error": "Session not found"}), 404
    
    db.session.delete(session)
    db.session.commit()
    return jsonify({"message": "Pomodoro canceled"}), 200


@pomodoro.route('/history', methods=["GET"])
@jwt_required()
def get_history():
    user_id = get_jwt_identity()
    sessions = PomodoroSession.query.filter(user_id = user_id).order_by(PomodoroSession.start_time.desc()).all()

    return jsonify([{
        "id": s.id,
        "start_time": s.start_time.isoformat(),
        "end_time": s.end_time.isoformat() if s.end_time else None,
        "duration": s.duration,
        "session_type": s.session_type,
        "status": s.status
    } for s in sessions])
    

@pomodoro.route('/daily', methods=["GET"])
@jwt_required()
def get_daily_minutes():
    user_id = get_jwt_identity()

    today = date.today()
    sessions = (PomodoroSession.query
                .filter(
                    func.date(PomodoroSession.start_time) == today,
                    PomodoroSession.status == "completed"
                )
                .all())

    total_minutes = 0

    for s in sessions:
        total_minutes += s.duration

    return jsonify({ "total": total_minutes }), 200
