import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { LandingPage } from './components/landing-page'

const app = new Hono()


app.get('/', (c) => {
  return c.html('<!DOCTYPE html>' + <LandingPage />)
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
