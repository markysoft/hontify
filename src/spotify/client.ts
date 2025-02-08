import { SpottyTokenSchema, type SpottyToken } from './SpottyToken.js'

const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET

interface SpotifyError {
    error: string,
    error_description: string,
}


export class SpottyClient {
    clientId: string
    clientSecret: string
    token: SpottyToken | undefined
    constructor() {
        this.clientId = process.env.SPOTIFY_CLIENT_ID ?? ''
        this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? ''
    }

    async updateToken(): Promise<void> {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: new URLSearchParams({
                'grant_type': 'client_credentials',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(this.clientId + ':' + this.clientSecret).toString('base64')),
            },
        })

        if (response.status === 200) {
            const responseJson = await response.json() as unknown
            this.token = SpottyTokenSchema.parse(responseJson)

        } else {
            const responseJson = await response.json() as SpotifyError
            throw new Error(`Failed to get token: ${responseJson.error_description}`)
        }
    }

    async getTrackInfo(trackId: string) {
        if (this.token === undefined || this.token.expired()) {
            await this.updateToken()
        }
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.token?.accessToken },
        })

        return await response.json()
    }
}

export async function getToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
        },
    })

    return await response.json()
}

export async function getTrackInfo(access_token: string) {
    const response = await fetch('https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + access_token },
    })

    return await response.json()
}

export async function writeInfo() {
    const response = await getToken()
    const profile = await getTrackInfo(response.access_token)
    console.log(profile)
}