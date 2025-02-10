import { Hono } from 'hono'
import { generateRandomString } from '../auth/generateRandomString'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { getSpotifyLoginUrl } from '../auth/getSpotifyLoginUrl'
import { buildAuthRequest } from '../auth/buildAuthRequest'
import { UserTokenResponseSchema } from '../spotify/responses/UserTokenResponse'
import { SpotifyError } from '../spotify/responses/ErrorResponse'
import { Layout } from '../components/structure/layout'
import { ErrorMessage } from '../components/structure/error-message'

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
            c.status(401)
            return c.render(
                <Layout title="Hontify" loggedIn={false}>
                    <ErrorMessage message='state mismatch' />
                </Layout>
            )            
        }
        deleteCookie(c, 'state')

        const authResponse = await fetch('https://accounts.spotify.com/api/token', buildAuthRequest(code))
        const authJson = await authResponse.json() as unknown
        if (authResponse.ok) {
            const userToken = UserTokenResponseSchema.parse(authJson)
            const expires = new Date(Date.now() + ((userToken.expires_in - 10) * 1000))
            setCookie(c, 'accessToken', userToken.access_token, { expires, httpOnly: true })
            setCookie(c, 'refreshToken', userToken.refresh_token)
            return c.redirect('/')
        }
        const errorDetails = authJson as SpotifyError
        c.status(401)
        return c.render(
            <Layout title="Hontify" loggedIn={false}>
                <ErrorMessage message={`${errorDetails.error}, ${errorDetails.error_description}`} />
            </Layout>
        )
    })

    app.get('/logout', (c) => {
        deleteCookie(c, 'accessToken')
        deleteCookie(c, 'refreshToken')
        return c.redirect('/')
    })
}