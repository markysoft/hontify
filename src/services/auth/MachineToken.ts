import config from '../../config'
const { spotify } = config
import { TokenResponseSchema } from './responses/TokenResponse'
import { ErrorResponseSchema } from './responses/ErrorResponse'

const spotifyUrl = 'https://accounts.spotify.com/api'
const tenSecondsInMilliseconds = 10000

export class MachineToken {
    accessToken = ''
    expires = 0

    expired() : boolean {
        // subtract 10 seconds to ensure we don't expire during processing
        return Date.now() > this.expires - tenSecondsInMilliseconds
    }

    async getAccessToken(): Promise<string> {
        if (this.expired()) {
            await this.updateToken()
        }
        return this.accessToken
    }

    private async updateToken(): Promise<void> {
        try {
            console.log('updating token')
            const response = await fetch(`${spotifyUrl}/token`, this.tokenRequest())
            if (response.status === 200) {
                const responseJson = await response.json() as unknown
                const { access_token, expires_in } = TokenResponseSchema.parse(responseJson)
                this.accessToken = access_token
                this.expires = Date.now() + (expires_in * 1000)
            } else {
                const { error_description } = ErrorResponseSchema.parse(await response.json())
                throw new Error(`Failed to get token: ${error_description}`)
            }
        } catch (e) {
            console.error(e)
            throw new Error('Failed to get token')
        }
    }

    private tokenRequest(): RequestInit {
        return {
            method: 'POST',
            body: new URLSearchParams({ 'grant_type': 'client_credentials', }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${spotify.authcode}`,
            },
        }
    }
}