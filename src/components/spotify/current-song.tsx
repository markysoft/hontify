
import { FC } from 'hono/jsx'
import { CurrentlyPlaying } from '../../services/spotify/domain/CurrentlyPlaying'
import { SongCard } from './song-card'

export const CurrentSong: FC<{ song: CurrentlyPlaying }> = (props: { song: CurrentlyPlaying }) => {
    return (
        <>
            <h2 class="title has-text-primary-15">Now Playing</h2>
            <div class="fixed-grid has-1-cols">
                <div class="grid">
                    <SongCard song={props.song} size="medium" />
                </div>
            </div>
        </>
    )
}
