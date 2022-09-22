from flask import Blueprint
from flask_cors import cross_origin

bp = Blueprint('user', __name__, url_prefix="/user")

@bp.route('/')
@cross_origin()
def index():
    return {'message': 'User Index'}