import { Context } from 'hono'
import config from '../../config'
import { ErrorResponseSchema } from './responses/ErrorResponse'
import { getCookie, setCookie } from 'hono/cookie'
import { UserTokenResponseSchema } from './responses/UserTokenResponse'
import { getTokenExpiry } from './getTokenExpiry'
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

    public async getToken() : Promise<string> {
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
                setCookie(this.c, 'accessToken', this.accessToken, {
                    expires: getTokenExpiry(userToken.expires_in),
                    httpOnly: true
                })
            } else {
                const { error_description } = ErrorResponseSchema.parse(await response.json())
                console.error('Failed to get token', error_description)
            }
        } catch (e) {
            console.error('Failed to get token', e)
        }
    }

    private tokenRequest(): RequestInit {
        return {
            method: 'POST',
            body: new URLSearchParams({
                'grant_type': 'refresh_token',
                'refresh_token': this.refreshToken
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${spotify.authcode}`,
            },
        }
    }
}