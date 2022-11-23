
![Logo](https://audixbucket.s3.us-west-1.amazonaws.com/Audix+%2B+Static+(500+%C3%97+250+px)+(1000+%C3%97+500+px).gif)


## Description
Audix is a website that allows users to create a STATIC that can be shared on social media.
It aims to replicate what Receiptify does but with a few more features.

Built on a React front-end with vanilla CSS for styling and a Nodejs/Express back-end that handles Spotify Web API authentication.

The included Flask-server is fully functional and is the original backend used for this project. It was not used in deployment due to compatibility issues with Windows/Railway.

## Features

- View Spotify top artists, tracks, recent songs, and profile
- Create and download image of top Spotify tracks
- Dynamic STATIC background for more personalization
- Mobile optimized

## API Reference

#### Spotify Web API authentication

 #### Authorize
 `GET /authorize`
 Calls `/authorize` Spotify endpoint to verify app credentials and prompt user login

 #### Callback
 `GET /callback`
 Spotify redirects to this endpoint upon login and retrieves user tokens for frontend

 #### Token Refresh
 `GET /refresh_token`
 If token expires, frontend navigates to this endpoint passing in a `refresh_token` and retrieves new access token

## Acknowledgements

 - [Readme.so](https://readme.so/)
 - [Spotify-Profile](https://github.com/bchiang7/spotify-profile)
 - [Receiptify](https://www.receiptify.us/)

### DISCLAIMER

ALL IMAGES AND ASSETS ARE NOT MINE AND ARE THE WORK OF SOMEONE ELSE. THIS IS MERELY A PORTFOLIO/SIDE PROJECT.
