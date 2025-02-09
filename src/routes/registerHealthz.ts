import { Hono } from 'hono'

export function registerHealthz(app: Hono): void {
    app.get('/healthz', (c) => {
        return c.json({ status: 'ok' })
    })
}