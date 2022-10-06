# Config
from urllib.parse import urlencode
from flask import ( Flask, redirect, make_response, request )
from flask_cors import cross_origin
from dotenv import dotenv_values
import random
import string
import requests

# Init
def create_app():
    app = Flask(__name__)

    config = dotenv_values('.env')

    @app.route('/authorize')
    @cross_origin(origin='*')
    def authorize():
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

    @app.route('/callback')
    @cross_origin(origin='*')
    def callback():
        client_id = config['CLIENT_ID']
        client_secret = config['CLIENT_SECRET']
        redirect_uri = config['REDIRECT_URI']
        frontend_uri = config['FRONTEND_URI']

        if request.args.get('error') == 'access_denied':
            return redirect(f'{frontend_uri}/error/access_denied')
        else :
            token_url = 'https://accounts.spotify.com/api/token'
            code = request.args.get('code')

            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            body = {
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': redirect_uri,
                'client_id': client_id,
                'client_secret': client_secret
            }

            post_response = requests.post(token_url, headers=headers, data=body)

        if post_response.status_code == 200 :
            res = post_response.json()
            access_token, refresh_token, expires_in = [res['access_token'], res['refresh_token'], res['expires_in']]

            params = {
                'access_token': access_token,
                'refresh_token': refresh_token,
                'expires_in': expires_in
            }

            response = redirect(frontend_uri + '?' + urlencode(params))

            return response
        else:
            return redirect('http://localhost:3000/')

    @app.route('/refresh_token')
    @ cross_origin(origin='*')
    def refresh_token():
        client_id = config['CLIENT_ID']
        authorization = config['AUTHORIZATION']
        refresh_token = request.args.get('refresh_token')
        print(refresh_token)

        token_url = 'https://accounts.spotify.com/api/token'
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization':  'Basic ' + authorization
        }
        body = {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': client_id
        }

        post_response = requests.post(token_url, headers=headers, data=body)
    
        if post_response.status_code == 200 :
            res = post_response.json()
            access_token = res['access_token']
            print(access_token)

            return {'access_token': access_token}
        else:
            res = post_response.json()
            error = res['error']

            return f'error {error}'

    return app