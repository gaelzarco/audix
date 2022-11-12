// UTILITY ****************************************************************************************************
export const getParams = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    const params = {
        'accessToken': urlParams.get('access_token'),
        'refreshToken': urlParams.get('refresh_token'),
    }
    
    return params
}

 // Stack Overflow https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
 export const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }