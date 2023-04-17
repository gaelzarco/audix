<div align='center'>

#### Audix is a website that allows users to create a STATIC that can be shared on social media. It aims to replicate what Receiptify does but with a few more features. 🔮

#### Features

View Spotify top artists, tracks, recent songs, and profile 👤
 
Create and download image of top Spotify tracks 🎧
 
Dynamic STATIC background for more personalization 🖌️
 
Mobile optimized 📱

<img src="https://readmeimg.s3.us-west-2.amazonaws.com/audix-x1_so.png" width="100%"/>

<img src="https://readmeimg.s3.us-west-2.amazonaws.com/audix-x2_so.png" width="100%"/>

<img src="https://readmeimg.s3.us-west-2.amazonaws.com/audix-x3_so.png" width="100%"/>

#### API Reference

### Spotify Web API authentication

 #### Authorize
 `GET /authorize`
 Calls `/authorize` Spotify endpoint to verify app credentials and prompt user login

 #### Callback
 `GET /callback`
 Spotify redirects to this endpoint upon login and retrieves user tokens for frontend

 #### Token Refresh
 `GET /refresh_token`
 If token expires, frontend navigates to this endpoint passing in a `refresh_token` and retrieves new access token

### Acknowledgements
 
<div align='center'>
 
[Spotify-Profile](https://github.com/bchiang7/spotify-profile) (how tokens are handled on client-side and overall inspiration) 
 
</div>
 
<div align='center'>
 
[Receiptify](https://www.receiptify.us/) (inspiration behind STATIC)
 
</div>

### DISCLAIMER

ALL IMAGES AND ASSETS ARE NOT MINE AND ARE THE WORK OF SOMEONE ELSE.

SPOTIFY DID NOT GRANT A QUOTA EXTENSION THEREFORE A DEMO ACCOUNT IS PROVIDED.

</div>
