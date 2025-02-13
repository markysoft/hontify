
import { FC } from 'hono/jsx'
import { Track } from '../../services/spotify/domain/Track'
import { SongCard } from './song-card'

export const CurrentSong: FC<{ song: Track }> = (props: { song: Track }) => {
    return (
        <>
            <h2 class="title has-text-primary-15">Now Playing</h2>
            <div class="fixed-grid has-1-cols">
                <div class="grid">
                    <SongCard song={props.song} size="large" />
                </div>
            </div>
        </>
    )
}
