import { Hono } from 'hono'
import { Spotify } from '../services/spotify/Spotify'
import { RecentSongs } from '../components/spotify/recent-songs'
import { ErrorMessage } from '../components/structure/error-message'
import { RecentlyPlayed } from '../services/spotify/domain/RecentlyPlayed'
import { CurrentSong } from '../components/spotify/current-song'
import { UserToken } from '../services/auth/UserToken'

const app = new Hono()
const spotify = new Spotify()

app.get('/recent-songs', async (c) => {
    const userToken = new UserToken(c)
    const accessToken = await userToken.getToken()
    if (accessToken) {
        const recentlyPlayed: RecentlyPlayed = await spotify.getRecent(accessToken)
        return c.render(<RecentSongs recentlyPlayed={recentlyPlayed} />)
    }
    c.status(401)
    return c.render(<ErrorMessage message='No access token found, please login again' />)

})

app.get('/current-song', async (c) => {
    const userToken = new UserToken(c)
    const accessToken = await userToken.getToken()
    if (accessToken) {
        const current = await spotify.getCurrentlyPlaying(accessToken)
        if (current) {
            c.header('HX-Trigger', 'currentSongUpdated')
            return c.render(<CurrentSong song={current} />)
        }
        // return no content so the element doesn't refresh
        return c.body(null, 204)
    }
    c.status(401)
    return c.json({ message: 'No access token found, please login again' })
})


export default app