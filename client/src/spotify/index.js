import axios from 'axios'
import { getParams } from '../utility';

const EXPIRATION_TIME = 3600 * 1000

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = (token) => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token')
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

const refreshAccessToken = () => {
    try {
        axios.get(`http://localhost:5000/refresh_token?refresh_token=${getLocalRefreshToken()}`)
        .then(res => setLocalAccessToken(res.data.access_token))
        .then(() => window.location.reload())
    } catch (e) {
        console.log(e)
    }    
}

const getAccessToken = () => {
    const { accessToken, refreshToken } = getParams()

    if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
        refreshAccessToken()
    }

    const localAccessToken = getLocalAccessToken()

    if (typeof localAccessToken !== 'string' && accessToken === null) {
        refreshAccessToken()
    }

    if((!localAccessToken || localAccessToken === 'undefined') && accessToken !== null) {
        setLocalAccessToken(accessToken)
        setLocalRefreshToken(refreshToken)
        return accessToken
    }

    return localAccessToken
}

export const token = getAccessToken()

export const logout = () => {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
  };

const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
}

export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers })

export const getFollowing = () => axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers })

export const getRecentlyPlayed = () =>
  axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers });

// export const getPlaylists = () => axios.get('https://api.spotify.com/v1/me/playlists', { headers });

export const getArtist = (id) => axios.get(`https://api.spotify.com/v1/artists/${id}`, {headers})

export const getTopArtistsShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', {
    headers,
  });
export const getTopArtistsMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', {
    headers,
  });
export const getTopArtistsLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', { headers });


export const getTopTracksShort = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', { headers });

  export const getTopTracksMedium = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', {
    headers,
  });
export const getTopTracksLong = () =>
  axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', { headers });

