import { spotify } from '../config'
const spotifyUrl = 'https://accounts.spotify.com/api'

export async function getToken() {
    const response = await fetch(`${spotifyUrl}/token`, {
        method: 'POST',
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' +
                (Buffer.from(spotify.clientId + ':' + spotify.clientSecret).toString('base64')),
        },
    })
    return response
}

