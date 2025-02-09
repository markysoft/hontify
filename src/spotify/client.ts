import type { SpotifyError } from './responses/ErrorResponse'
import { getToken } from './spotifyService'
import { SpottyTokenSchema, type SpottyToken } from './SpottyToken'

export class SpottyClient {
    token: SpottyToken | undefined

    async updateToken(): Promise<void> {
        const response = await getToken()

        if (response.status === 200) {
            const responseJson = await response.json() as unknown
            this.token = SpottyTokenSchema.parse(responseJson)
        } else {
            const responseJson = await response.json() as SpotifyError
            throw new Error(`Failed to get token: ${responseJson.error_description}`)
        }
    }

    async getTrackInfo(trackId: string) {
        if (this.tokenInvalid()) {
            await this.updateToken()
        }
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.token?.accessToken },
        })
        return await response.json()
    }

    async getRecent() {
        if (this.tokenInvalid()) {
            await this.updateToken()
        }
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.token?.accessToken },
        })
        return await response.json()
    }

    private tokenInvalid() {
        return this.token === undefined || this.token.expired()
    }
}
