import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { Spotify } from '../spotify/Spotify'
import { RecentSongs } from '../components/recent-songs'
import { ErrorMessage } from '../components/structure/error-message'
import { RecentlyPlayed } from '../spotify/domain/RecentlyPlayed'
import { CurrentSong } from '../components/current-song'

export function registerSpotify(app: Hono): void {

    app.get('/recent-songs', async (c) => {
        const before = c.req.query('before')
        const accessToken = getCookie(c, 'accessToken')
        if (!accessToken) {
            c.status(401)
            return c.render(<ErrorMessage message='No access token found, please login again' />)
        }
        const spotify = new Spotify()

        const recentlyPlayed: RecentlyPlayed = await spotify.getRecent(accessToken, before)
        return c.render(<RecentSongs recentlyPlayed={recentlyPlayed } />)
    })

    app.get('/recent-songs-json', async (c) => {
        const before = c.req.query('before')
        const accessToken = getCookie(c, 'accessToken')
        if (!accessToken) {
            c.status(401)
            return c.json( { message: 'No access token found, please login again' })
        }
        const spotify = new Spotify()
        const recent : RecentlyPlayed = await spotify.getRecent(accessToken, before)
        return c.json(recent)
    })

    app.get('/current-song', async (c) => {
        const accessToken = getCookie(c, 'accessToken')
        if (!accessToken) {
            c.status(401)
            return c.json({ message: 'No access token found, please login again' })
        }
        const spotify = new Spotify()
        const current = await spotify.getCurrentlyPlaying(accessToken)
        // return c.json(current)
        return c.render( <CurrentSong song={current} />)
    })
}