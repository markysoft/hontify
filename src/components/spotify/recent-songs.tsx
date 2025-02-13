import { FC } from 'hono/jsx'
import { RecentlyPlayed } from '../../services/spotify/domain/RecentlyPlayed'
import { SongCard } from './song-card'
import { Track } from '../../services/spotify/domain/Track'

export const RecentSongs: FC<{ recentlyPlayed: RecentlyPlayed }> = (props: { recentlyPlayed: RecentlyPlayed }) => {
    return (
        < >
            <h2 class="title has-text-primary-15">Recent Songs</h2>
            <div class="grid is-col-min-9">
                {props.recentlyPlayed.items.map((song: Track) => <SongCard song={song} size="medium" />)}
            </div>
        </>
    )
}