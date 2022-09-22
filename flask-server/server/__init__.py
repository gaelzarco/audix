# Config
from flask import Flask
from flask_cors import cross_origin

# Init
def create_app():
    app = Flask(__name__)

    @app.route('/index')
    @cross_origin()
    def index():
        return {'message': 'Python-Flask PostgreSQL Connection Established'}

    # Register User Blueprint
    from . import user
    app.register_blueprint(user.bp)
    
    return app