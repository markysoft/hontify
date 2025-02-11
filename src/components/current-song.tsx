
import { FC } from 'hono/jsx'
import { CurrentlyPlaying } from '../spotify/domain/CurrentlyPlaying'
export const CurrentSong: FC<{ song: CurrentlyPlaying }> = (props: { song: CurrentlyPlaying }) => {
    return (
        <>
            <h2 class="title has-text-primary-15">Now Playing</h2>
            <div class="fixed-grid has-1-cols">
                <div class="grid">
                    <div class="cell">
                        <div class="card-image">
                            <figure class="image is-square">
                                <img
                                    src={props.song.images.large}
                                    alt="Placeholder image" />
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                <a href={props.song.url}>{props.song.name}</a><br />
                                {props.song.artist} - {props.song.album.name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
