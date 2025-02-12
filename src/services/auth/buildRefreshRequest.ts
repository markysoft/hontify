import config from '../../config'
const { spotify } = config

export function buildRefreshRequest(refreshToken: string) {

    const authCode = `${spotify.clientId}:${spotify.clientSecret}`
    const body = new URLSearchParams()
    body.append('grant_type', 'refresh_token')
    body.append('refresh_token', refreshToken)

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