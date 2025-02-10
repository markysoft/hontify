/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { Spotify } from '../spotify/Spotify'
import { RecentSongs } from '../components/recent-songs'
import { ErrorMessage } from '../components/structure/error-message'

export function registerSpotify(app: Hono): void {

    app.get('/recent-songs', async (c) => {
        const accessToken = getCookie(c, 'accessToken')
        if (!accessToken) {
            return c.render(<ErrorMessage message='No access token found, please login again' />)
        }
        const spotify = new Spotify()
        const recent = await spotify.getRecent(accessToken)
        const songs = recent.items.map((item: any) => { return { name: item.track.name, artist: item.track.artists[0].name, link: item.track.external_urls.spotify } })
        return c.render(<RecentSongs songs={ songs } />)
    })
}