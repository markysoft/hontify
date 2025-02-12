import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
import { jsxRenderer } from 'hono/jsx-renderer'
import { getCookie } from 'hono/cookie'
import { LandingPage } from './components/landing-page'
import { MainPage } from './components/main-page'
import spotify from './routes/spotify'
import healthz from './routes/healthz'
import auth from './routes/auth'
import config from './config'

const app = new Hono()

app.use(logger())
app.use(timing())
app.use('*', jsxRenderer(({ children }) => <html>{children}</html>, { docType: true }))

app.get('/', (c) => {
  return c.render(getCookie(c, 'accessToken') ?
    <MainPage refreshInterval={config.spotify.refreshInterval} /> :
    <LandingPage />)
})

app.route('/auth', auth)
app.route('/spotify', spotify)
app.route('/healthz', healthz)


console.log(`Server is running on http://localhost:${config.port}`)

serve({ fetch: app.fetch, port: config.port })