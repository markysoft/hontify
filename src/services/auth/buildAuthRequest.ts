import config from '../../config'
const { spotify } = config

export function buildAuthRequest(code: string)  {

    return {
        method: 'POST',
        body: new URLSearchParams({
             'code': code, 'redirect_uri': spotify.redirectUri,
              'grant_type': 'authorization_code'
             }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${spotify.authcode}`,
        },
        json: true
    }
}
