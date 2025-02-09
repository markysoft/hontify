import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { setCookie, getCookie, deleteCookie } from 'hono/cookie'
import { LandingPage } from './components/landing-page'
import { buildLoginParams } from './auth/buildLoginParams'
import { generateRandomString } from './auth/generateRandomString'
import { buildAuthRequest } from './auth/buildAuthRequest'
import { UserTokenResponseSchema } from './spotify/responses/UserTokenResponse'
import { Spotify } from './spotify/Spotify'


const app = new Hono()

app.get('/', (c) => {
  return c.html('<!DOCTYPE html>' + <LandingPage />)
})

app.get('/login', (c) => {
  const scope = 'user-read-private user-read-email user-read-recently-played'
  const state = generateRandomString(16)
  const params = buildLoginParams(scope, state)
  setCookie(c, 'state', state)
  console.log(`Redirecting to Spotify with ${params}`)
  return c.redirect(`https://accounts.spotify.com/authorize?${params}`)
})

app.get('/callback', async (c) => {
  console.log('Callback received')
  const code = c.req.query('code') ?? ''
  const state = c.req.query('state')
  const storedState = getCookie(c, 'state')

  if (state === null || state !== storedState) {
    return c.json({ error: 'state_mismatch' }, 401)
  }
  deleteCookie(c, 'state')

  const authResponse = await fetch('https://accounts.spotify.com/api/token', buildAuthRequest(code))
  const authJson = await authResponse.json() as unknown
  if  (authResponse.ok) {
    const userToken = UserTokenResponseSchema.parse(authJson)
    setCookie(c, 'accessToken', userToken.access_token)
    setCookie(c, 'refreshToken', userToken.refresh_token)
    const spotify = new Spotify()
    const recent = await spotify.getRecent(userToken.access_token)
    return c.json({ status: 'ok', recent })
  }
  return c.json({ status: 'boom', authJson })
})

app.get('/healthz', (c) => {
  return c.json({ status: 'ok' })
})

const port = process.env.PORT ? Number(process.env.PORT) : 3000

console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})


