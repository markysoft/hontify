import { Context } from 'hono'
import config from '../../config'
import { ErrorResponseSchema } from './responses/ErrorResponse'
import { getCookie, setCookie } from 'hono/cookie'
import { UserTokenResponseSchema } from './responses/UserTokenResponse'
const { spotify } = config

const spotifyTokenUrl = 'https://accounts.spotify.com/api/token'

export class UserToken {
    private accessToken = ''
    private refreshToken = ''
    private c: Context

    constructor(c: Context) {
        this.accessToken = getCookie(c, 'accessToken') ?? ''
        this.refreshToken = getCookie(c, 'refreshToken') ?? ''
        this.c = c
    }

    public async getToken() {
        if (this.accessToken === '') {
            await this.updateToken()
        }
        return this.accessToken
    }

    private async updateToken(): Promise<void> {
        try {
            console.log('updating token')
            const response = await fetch(spotifyTokenUrl, this.tokenRequest())
            if (response.status === 200) {
                const refreshJson = await response.json() as unknown
                const userToken = UserTokenResponseSchema.parse(refreshJson)
                this.accessToken = userToken.access_token
                const expires = new Date(Date.now() + ((userToken.expires_in - 10) * 1000))
                setCookie(this.c, 'accessToken', this.accessToken, { expires, httpOnly: true })
            } else {
                const { error_description } = ErrorResponseSchema.parse(await response.json())
                console.error('Failed to get token', error_description)
            }
        } catch (e) {
            console.error('Failed to get token', e)
        }
    }

    private tokenRequest(): RequestInit {
        const authCode = `${spotify.clientId}:${spotify.clientSecret}`
        return {
            method: 'POST',
            body: new URLSearchParams({ 'grant_type': 'refresh_token', 'refresh_token': this.refreshToken }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + (Buffer.from(authCode).toString('base64')),
            },
        }
    }
}