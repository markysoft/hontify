/* eslint-disable @typescript-eslint/no-explicit-any */
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { setCookie, getCookie, deleteCookie } from 'hono/cookie'
import { LandingPage } from './components/landing-page'
import { getSpotifyLoginUrl } from './auth/getSpotifyLoginUrl'
import { generateRandomString } from './auth/generateRandomString'
import { buildAuthRequest } from './auth/buildAuthRequest'
import { UserTokenResponseSchema } from './spotify/responses/UserTokenResponse'
import { Spotify } from './spotify/Spotify'
import { MainPage } from './components/main-page'
import { RecentSongs } from './components/recent-songs'
import { link } from 'fs'


const app = new Hono()
app.use(
  '*',
  jsxRenderer(
    ({ children }) => {
      return (
        <html>
         {children}
        </html>
      )
    },
    { docType: false }
  )
)



app.get('/', (c) => {
  const accessToken = getCookie(c, 'accessToken')
  if (!accessToken) {
    return c.render(<LandingPage />)
  }
  return c.render(<MainPage/>)
})

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

app.get('/recent-songs', async (c) => {
  const accessToken = getCookie(c, 'accessToken')
  if (!accessToken) {
    return c.json({ error: 'no_token' }, 401)
  }
  const spotify = new Spotify()
  const recent = await spotify.getRecent(accessToken)
  const songs = recent.items.map((item: any) => { return { name: item.track.name, artist: item.track.artists[0].name, link: item.track.external_urls.spotify } })
  return c.render(<RecentSongs songs={songs} />)
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


