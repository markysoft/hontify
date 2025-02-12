import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { Spotify } from '../services/spotify/Spotify'
import { RecentSongs } from '../components/spotify/recent-songs'
import { ErrorMessage } from '../components/structure/error-message'
import { RecentlyPlayed } from '../services/spotify/domain/RecentlyPlayed'
import { CurrentSong } from '../components/spotify/current-song'

const app = new Hono()

const spotify = new Spotify()

app.get('/recent-songs', async (c) => {
    const accessToken = getCookie(c, 'accessToken')
    if (!accessToken) {
        c.status(401)
        return c.render(<ErrorMessage message='No access token found, please login again' />)
    }

    const recentlyPlayed: RecentlyPlayed = await spotify.getRecent(accessToken)
    return c.render(<RecentSongs recentlyPlayed={recentlyPlayed} />)
})

app.get('/current-song', async (c) => {
    const accessToken = getCookie(c, 'accessToken')
    if (!accessToken) {
        c.status(401)
        return c.json({ message: 'No access token found, please login again' })
    }
    const current = await spotify.getCurrentlyPlaying(accessToken)
    if (current) {
        c.header('HX-Trigger', 'currentSongUpdated')
        return c.render(<CurrentSong song={current} />)
    }
    return c.body(null, 204)
})

export default app