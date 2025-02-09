
import { spotify } from '../config'

export function buildAuthRequest(code: string) {

    const authCode = `${spotify.clientId}:${spotify.clientSecret}`
    const body = new URLSearchParams()
    body.append('code', code)
    body.append('redirect_uri', spotify.redirectUri)
    body.append('grant_type', 'authorization_code')
    
    return {
        method: 'POST',
        body,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(authCode).toString('base64')),
        },
        json: true
    }
}
