from server import create_app

# Blueprint Import
from server.blueprints.user import user

app = create_app()

app.register_blueprint(user)