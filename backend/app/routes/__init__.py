from .auth import auth as auth_blueprint
from .tasks import task as task_blueprint

def register_routes(app):
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(task_blueprint)
    