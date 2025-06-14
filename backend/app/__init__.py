from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
from app.models import db
from app.models.user import User
import os

jwt = JWTManager()

def create_app():
    load_dotenv()

    # create and configure the app
    app = Flask(__name__)
    app.config.from_object("config.Config")

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    from .routes import register_routes
    register_routes(app)

    with app.app_context():
        db.create_all()

    # a simple page that says hello
    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app