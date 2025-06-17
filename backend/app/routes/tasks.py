from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from datetime import datetime

from ..models import db
from ..models.user import User
from ..models.task import Task

task = Blueprint("task", __name__, url_prefix="/api/tasks")

@task.route('/', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    return jsonify([{
        'id': t.id,
        'title': t.title,
        'description': t.description,
        'due_date': t.due_date.isoformat(),
        'priority': t.priority,
        'tags': t.tags,
        'is_done': t.is_done
    } for t in user.tasks])
    

@task.route('/', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_jwt_identity()
    data = request.get_json()

    # Create new task with the data
    new_task = Task(
            title=data.get('title'), 
            description=data.get('description', ""), 
            due_date=data.get('due_date', datetime.now()),
            priority=data.get('priority', "medium"),
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