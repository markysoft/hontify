import { Hono } from 'hono'
import { registerAuth } from './registerAuth'
import { registerHealthz } from './registerHealthz'
import { registerSpotify } from './registerSpotify'

export function registerRoutes(app: Hono): void {
    registerAuth(app)
    registerHealthz(app)
    registerSpotify(app)
}