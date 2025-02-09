/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { Spotify } from '../spotify/Spotify'
import { RecentSongs } from '../components/recent-songs'

export function registerSpotify(app: Hono): void {

    app.get('/recent-songs', async (c) => {
        const accessToken = getCookie(c, 'accessToken')
        if (!accessToken) {
            return c.json({ error: 'no_token' }, 401)
        }
        const spotify = new Spotify()
        const recent = await spotify.getRecent(accessToken)
        const songs = recent.items.map((item: any) => { return { name: item.track.name, artist: item.track.artists[0].name, link: item.track.external_urls.spotify } })
        return c.render(<RecentSongs songs={ songs } />)
    })
}