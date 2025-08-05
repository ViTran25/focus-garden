from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from datetime import datetime

from ..models import db
from ..models.pomodoro import PomodoroSession

pomodoro = Blueprint("pomodoro", __name__, url_prefix="/api/pomodoro")

@pomodoro.route('/start', methods=['POST'])
@jwt_required()
def start_session():
    user_id = get_jwt_identity()

    new_session = PomodoroSession(
        user_id = user_id,
        start_time = datetime.now(),
        session_type = request.json.get("session_type", "focus"),
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
    session.duration = (session.end_time - session.start_time) // 60

    db.session.commit()

    return jsonify({"message": "Pomodoro ended", "duration": session.duration}), 200

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
    