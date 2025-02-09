
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { getCookie } from 'hono/cookie'
import { LandingPage } from './components/landing-page'
import { MainPage } from './components/main-page'
import { registerRoutes } from './routes/registerRoutes'

const app = new Hono()

app.use('*', jsxRenderer(({ children }) => <html>{children}</html>, { docType: true }))

app.get('/', (c) => {
  const accessToken = getCookie(c, 'accessToken')
  if (accessToken) {
    return c.render(<MainPage />)
  }
  return c.render(<LandingPage />)
})

registerRoutes(app)

const port = process.env.PORT ? Number(process.env.PORT) : 3000

console.log(`Server is running on http://localhost:${port}`)

serve({ fetch: app.fetch, port })