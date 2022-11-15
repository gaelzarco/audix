
![Logo](https://audixbucket.s3.us-west-1.amazonaws.com/Audix+%2B+Static+(500+%C3%97+250+px)+(1000+%C3%97+500+px).gif)


# AUDIX


## Description
Audix is a website that allows users to create a STATIC that can be shared on social media.
It aims to replicate what Receiptify does but with a few more features.

Built on a React front-end with vanilla CSS for styling and a Python/Flask back-end that handles Spotify Web API authentication.




## Features

- View Spotify top artists, tracks, recent songs, and profile
- Create image and download image of top tracks
- Mobile optimized


## API Reference

#### Spotify Web API authentication

 #### Authorize
```http
  GET /authorize
```
 Calls `/authorize` Spotify endpoint to verify app credentials and prompt user login


 #### Callback
```http
  GET /callback
```
 Spotify redirects to this endpoint upon login and retrieves user tokens for frontend

 #### Token Refresh
```http
  GET /refresh_token
```
 If token expires, frontend navigates to this endpoint passing in a `refresh_token` and retrieves new access token



## Acknowledgements

 - [Readme.so](https://readme.so/)
 - [Spotify-Profile](https://github.com/bchiang7/spotify-profile)
 - [Receiptify](https://www.receiptify.us/)

