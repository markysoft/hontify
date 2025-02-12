import { Hono } from 'hono'
import { generateRandomString } from '../services/auth/generateRandomString'
import { deleteCookie, getCookie, setCookie } from 'hono/cookie'
import { UserTokenResponseSchema } from '../services/auth/responses/UserTokenResponse'
import { ErrorResponseSchema } from '../services/auth/responses/ErrorResponse'
import { buildAuthRequest } from '../services/auth/buildAuthRequest'
import { getSpotifyLoginUrl } from '../services/auth/getSpotifyLoginUrl'
import { ErrorPage } from '../components/ux/error-page'
import { getTokenExpiry } from '../services/auth/getTokenExpiry'

const app = new Hono()

app.get('/login', (c) => {
    const state = generateRandomString(16)
    setCookie(c, 'state', state)
    console.log('Redirecting to Spotify')
    return c.redirect(getSpotifyLoginUrl(state))
})

app.get('/callback', async (c) => {
    const { code, state } = c.req.query()
    const storedState = getCookie(c, 'state')

    if (state && state !== storedState) {
        c.status(401)
        return c.render(<ErrorPage message='state mismatch' loggedIn={false} />)
    }

    deleteCookie(c, 'state')

    const authResponse = await fetch('https://accounts.spotify.com/api/token', buildAuthRequest(code))
    const authJson = await authResponse.json() as unknown

    if (authResponse.ok) {
        const userToken = UserTokenResponseSchema.parse(authJson)
        setCookie(c, 'accessToken', userToken.access_token, {
            expires: getTokenExpiry(userToken.expires_in),
            httpOnly: true
        })
        setCookie(c, 'refreshToken', userToken.refresh_token ?? '', {
            httpOnly: true
        })
        return c.redirect('/')
    }

    const errorDetails = ErrorResponseSchema.parse(authJson)
    c.status(401)
    return c.render(
        <ErrorPage
            message={`${errorDetails.error}, ${errorDetails.error_description}`}
            loggedIn={false}
        />
    )
})

app.get('/logout', (c) => {
    deleteCookie(c, 'accessToken')
    deleteCookie(c, 'refreshToken')
    return c.redirect('/')
})

export default app