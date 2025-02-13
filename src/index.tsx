import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { logger } from 'hono/logger'
import { timing } from 'hono/timing'
import { jsxRenderer } from 'hono/jsx-renderer'
import ui from './routes/ui'
import auth from './routes/auth'
import spotify from './routes/spotify'
import healthz from './routes/healthz'
import config from './config'

const app = new Hono()

app.use(logger())
app.use(timing())
app.use('*', jsxRenderer(({ children }) => <html>{children}</html>, { docType: true }))

app.route('/', ui)
app.route('/auth', auth)
app.route('/spotify', spotify)
app.route('/healthz', healthz)

console.log(`Server is running on http://${config.hostname}:${config.port}`)

serve({ fetch: app.fetch, hostname: config.hostname, port: config.port })