import { Hono } from 'hono'
import { registerAuth } from './auth'
import { registerHealthz } from './healthz'
import { registerSpotify } from './spotify'

export function registerRoutes(app: Hono): void {
    registerAuth(app)
    registerHealthz(app)
    registerSpotify(app)
}