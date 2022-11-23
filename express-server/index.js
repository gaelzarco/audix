const express = require('express')
const cors = require('cors')
const querystring = require('querystring')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

require('dotenv').config()
const PORT = process.env.PORT
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const AUTHORIZATION = process.env.AUTHORIZATION
const FRONTEND_URI = process.env.FRONTEND_URI
const REDIRECT_URI = process.env.REDIRECT_URI

app.get("/authorize", (req, res) => {
    // StackOverflow https://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript#12502559
    const state = Array(16).fill(0).map((x) => Math.random().toString(36).charAt(2)).join("");

    const scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public'

    return res.redirect('https://accounts.spotify.com/authorize?' + 
        querystring.stringify({
            response_type: 'code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state
        })
    )
})

app.get('/callback', (req, res) => {
    if (req.query.error) {
        console.log(req.query.error)
        return res.redirect(FRONTEND_URI)
    } else {
        const code = req.query.code

        const authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                'grant_type': 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code',
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET,
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + AUTHORIZATION
            },
            json: true
        }

        request.post(authOptions, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const access_token = body.access_token
                const refresh_token = body.refresh_token
    
                return res.redirect(
                    `${FRONTEND_URI}/?${querystring.stringify({
                        access_token,
                        refresh_token
                    })}`
                )
            } else {
                return res.redirect(FRONTEND_URI)
            }
        })
    }
})

app.get('/refresh_token', (req, res) => {
    const refresh_token = req.query.refresh_token
    console.log(refresh_token)

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
            'client_id': CLIENT_ID
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + AUTHORIZATION
        },
        json: true
    }

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const access_token = body.access_token
            res.send({ 'access_token': access_token })
        }
    })
})

app.listen(PORT, () => {
    console.log(`ADX XPRESS LISTENING ON PORT:${PORT}`);
  });