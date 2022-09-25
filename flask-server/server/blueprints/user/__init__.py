from urllib.parse import urlencode
from flask import ( Blueprint, redirect, make_response )
from flask_cors import CORS, cross_origin
from dotenv import dotenv_values
import random
import string

user = Blueprint('user', __name__)

@user.route('/login')
@cross_origin(origin='*')
def index():
    config = dotenv_values('.env')
    client_id = config['CLIENT_ID']
    redirect_uri = config['REDIRECT_URI']
    
    scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public'

    state = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(16))
    authorize_url = 'https://accounts.spotify.com/authorize?'
    params = {
        'response_type': 'code',
        'client_id': client_id,
        'scope': scope,
        'redirect_uri': redirect_uri,
        'state': state
    }

    query_params = urlencode(params)
    response = make_response(redirect(authorize_url + query_params))
    return response

@user.route('/callback')
@cross_origin(origin='*')
def index2():
    return ['message', 'successful']