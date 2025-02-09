import { Hono } from 'hono'
import { generateRandomString } from '../auth/generateRandomString'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { getSpotifyLoginUrl } from '../auth/getSpotifyLoginUrl'
import { buildAuthRequest } from '../auth/buildAuthRequest'
import { UserTokenResponseSchema } from '../spotify/responses/UserTokenResponse'

export function registerAuth(app: Hono): void {

    app.get('/login', (c) => {
        const state = generateRandomString(16)
        setCookie(c, 'state', state)
        console.log('Redirecting to Spotify')
        return c.redirect(getSpotifyLoginUrl(state))
    })

    app.get('/callback', async (c) => {
        console.log('Callback received')
        const { code, state } = c.req.query()
        const storedState = getCookie(c, 'state')

        if (state && state !== storedState) {
            return c.json({ error: 'state_mismatch' }, 401)
        }
        deleteCookie(c, 'state')

        const authResponse = await fetch('https://accounts.spotify.com/api/token', buildAuthRequest(code))
        const authJson = await authResponse.json() as unknown
        if (authResponse.ok) {
            const userToken = UserTokenResponseSchema.parse(authJson)
            setCookie(c, 'accessToken', userToken.access_token)
            setCookie(c, 'refreshToken', userToken.refresh_token)
            return c.redirect('/')
        }
        return c.json({ status: 'boom', authJson })
    })

    app.get('/logout', (c) => {
        deleteCookie(c, 'accessToken')
        deleteCookie(c, 'refreshToken')
        return c.redirect('/')
    })
}