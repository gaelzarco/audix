import axios from 'axios'

const expirationTime = 3600 * 1000 // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

const refreshAccessToken = async () => {
    try {
        const { data } = await axios.get(`/refresh_token?=refresh_token=${getLocalRefreshToken()}`)
        const { access_token } = data
        setLocalAccessToken(access_token)
        window.location.reload()
        return
    } catch (err) {
        console.log(err)
    }
}

export const getAccessToken = () => {
    const { error, access_token, refresh_token } = getHashParams
}