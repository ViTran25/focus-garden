from flask import Blueprint, redirect, url_for, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta
from ..models import db
from ..models.user import User


auth = Blueprint("auth", __name__)

@auth.route('/login', methods=['POST'])
def login():
    # Code to validate log in
    username = request.json.get('username')
    password = request.json.get('password')

    # if the information is incorrect, try again
    user = User.query.filter_by(username=username).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Please check your login details and try again."}), 401
    
    access_token = create_access_token(identity=str(user.id))
    return jsonify({"access_token": access_token}), 200


@auth.route('/signup', methods=['POST'])
def signup():
    # Code to validate and add user to database
    email = request.json.get('email')
    username = request.json.get('username')
    password = request.json.get('password')

    user = User.query.filter_by(email=email).first()

    # if the email is used, try again
    if user:
        return jsonify({"msg": "Email address already exists"}), 200
    
    user = User.query.filter_by(username=username).first()

    # if the username is used, try again
    if user:
        return jsonify({"msg": "Username already exists"}), 200
    
    # Create new user with the form data
    new_user = User(
            email=email, 
            username=username, 
            password=generate_password_hash(password)
        )
    # add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 200


@auth.route('/profile')
@jwt_required()
def profile():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)
    return jsonify({
        'username': user.username,
        'email': user.email,
    })


@auth.route('/logout')
def logout():
    return redirect(url_for('main.index'))