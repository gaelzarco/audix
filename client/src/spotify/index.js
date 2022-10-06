import axios from 'axios'
import { getParams } from '../utils';

// TOKENS *****************************************************************************************************
const EXPIRATION_TIME = 3600 * 1000 // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token')
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

// Refresh token 
export const refreshAccessToken = async () => {
    try {
        const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`)
        const { access_token } = data
        setLocalAccessToken(access_token)
        window.location.reload()
        return
    } catch (err) {
        console.log(err)
    }
}

// Get access token off of query params (passed in on app init)
export const getAccessToken = () => {
    const { accessToken, refreshToken, error } = getParams()

    if (error) {
      refreshAccessToken();
    }
  
    // If token has expired
    if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
      console.warn('Access token has expired, refreshing...');
      refreshAccessToken();
    }
  
    const localAccessToken = getLocalAccessToken();
  
    // If there is no ACCESS token in local storage, set it and return `accessToken` from params
    if ((!localAccessToken || localAccessToken === 'undefined') && accessToken) {
      setLocalAccessToken(accessToken);
      setLocalRefreshToken(refreshToken);
      return accessToken;
    }
  
    return localAccessToken;
  };
  
  export const token = getAccessToken();
  
  export const logout = () => {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
  };

// API Calls **************************************************************************************************
const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
}

// Get User's Profile
export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers })

// // Get User's Followed Artists
// export const getFollowing = () => axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers })

// // Get User's Playlists
// export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', { headers })

// // Get User's Top Artists
// export const getTopArtistsShort = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', { headers })
// export const getTopArtistsMedium = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', { headers })
// export const getTopArtistsLong = () => axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers })

// //Get User's Top Tracks
// export const getTopTracksShort = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers })
// export const getTopTracksMedium = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', { headers })
// export const getTopTracksLong = () => axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers })

export const getUserInfo = () => {
    axios
    .all([getUser(), getFollowing(), getPlaylists(), getTopArtistsLong(), getTopTracksLong()])
    .then(
        axios.spread((user, followedArtists, playlists, topArtists, topTracks) => ({
            user: user.data,
            followedArtists: followedArtists.data,
            playlists: playlists.data,
            topArtists: topArtists.data,
            topTracks: topTracks.data,
        }))
    )
}

// // UTILITY ****************************************************************************************************
// export const catchError = fn => 
//     function(...args) {
//         return fn(...args).catch(err => {
//             console.log(err)
//         })
//     }
