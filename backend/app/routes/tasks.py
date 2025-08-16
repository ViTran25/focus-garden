import sys
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from datetime import datetime, date, timedelta
from sqlalchemy import func

from ..models import db
from ..models.user import User
from ..models.task import Task

task = Blueprint("task", __name__, url_prefix="/api/tasks")

@task.route('/', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id, is_done=False).all()

    return jsonify([{
        'id': t.id,
        'title': t.title,
        'description': t.description,
        'due_date': t.due_date.isoformat(),
        'priority': t.priority,
        'tags': t.tags,
        'is_done': t.is_done
    } for t in tasks])
    

@task.route('/', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()
    data = request.get_json()
    print("Received data:", data, file=sys.stderr)
    try:
        due_date = datetime.strptime(data.get('due_date'), "%Y-%m-%dT%H:%M:%S.%fZ") if data.get('due_date') else datetime.now()
    except Exception as e:
        return jsonify({'error': 'Invalid due_date format'}), 400

    # Create new task with the data
    new_task = Task(
            title=data.get('title'), 
            description=data.get('description', ""), 
            due_date=due_date,
            priority=data.get('priority', 'Medium'),
            tags=data.get('tags', ""),
            is_done=False,
            user_id=user_id
        )
    
    # Add the new task to the database
    db.session.add(new_task)
    db.session.commit()

    return jsonify({'msg': 'Task created'}), 200

@task.route('/<int:task_id>', methods=['POST'])
@jwt_required()
def update_task(task_id):
    user_id = int(get_jwt_identity())
    task = Task.query.filter_by(id=task_id, user_id=user_id).first_or_404()
    data = request.get_json()

    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.due_date = data.get('due_date', task.due_date)
    task.priority = data.get('priority', task.priority)
    task.tags = data.get('tags', task.tags)
    task.is_done = data.get('is_done', task.is_done)

    db.session.commit()
    return jsonify({'msg': 'Task updated'})


@task.route('/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    user_id = int(get_jwt_identity())
    task = Task.query.filter_by(id=task_id, user_id=user_id).first_or_404()
    db.session.delete(task)
    db.session.commit()
    return jsonify({'msg': 'Task deleted'})

@task.route('/history', methods=["GET"])
@jwt_required()
def get_history():
    user_id = get_jwt_identity()
    tasks = Task.query.filter_by(user_id=user_id, is_done=True).order_by(Task.due_date.desc()).all()

    return jsonify([{
        'id': t.id,
        'title': t.title,
        'description': t.description,
        'due_date': t.due_date.isoformat(),
        'priority': t.priority,
        'tags': t.tags,
        'is_done': t.is_done
    } for t in tasks])


@task.route('/today', methods=['GET'])
@jwt_required()
def get_tasks_today():
    user_id = get_jwt_identity()

    today = date.today()
    tasks = Task.query.filter(
        func.date(Task.due_date) == today,
        Task.user_id == user_id
    ).all()

    return jsonify([{
        'id': t.id,
        'title': t.title,
        'description': t.description,
        'due_date': t.due_date.isoformat(),
        'priority': t.priority,
        'tags': t.tags,
        'is_done': t.is_done
    } for t in tasks])


@task.route('/future', methods=['GET'])
@jwt_required()
def get_tasks_future():
    user_id = get_jwt_identity()

    today = date.today()
    N = 7
    start = date.today() + timedelta(days=1)
    end = start + timedelta(days=N)

    tasks = Task.query.filter(
        Task.user_id == user_id,
        func.date(Task.due_date) >= start,
        func.date(Task.due_date) < end,
        Task.is_done == False,
    ).order_by(Task.due_date.asc()).all()

    return jsonify([{
        'id': t.id,
        'title': t.title,
        'description': t.description,
        'due_date': t.due_date.isoformat(),
        'priority': t.priority,
        'tags': t.tags,
        'is_done': t.is_done
    } for t in tasks])