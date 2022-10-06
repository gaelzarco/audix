// UTILITY ****************************************************************************************************
export const getParams = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    const params = {
        'accessToken': urlParams.get('access_token'),
        'refreshToken': urlParams.get('refresh_token'),
    }

    if (urlParams.get('error')) {
        params['error'] = urlParams.get('error')
    }

    return params
}

export const catchError = fn => 
    function(...args) {
        return fn(...args).catch(err => {
            console.log(err)
        })
    }