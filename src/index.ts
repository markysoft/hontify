import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono again!!!')
})

const port = process.env.PORT ? Number(process.env.PORT) : 10000

console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
