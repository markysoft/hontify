import { FC } from 'hono/jsx'
import { Track } from '../../services/spotify/domain/Track'

export const SongCard: FC<{ song: Track, size: string }> = (props: { song: Track, size: string }) => {
    const imageUrl = props.song.images[props.size as keyof typeof props.song.images]

    return (
        <div class="cell">
            <div class="card-image">
                <figure class="image">
                    <a href={props.song.url}><img
                        src={imageUrl}
                        alt={props.song.name} /></a>
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    <a href={props.song.url}>{props.song.name}</a><br />
                    {props.song.artist} - <a href={props.song.album.url}>{props.song.album.name}</a>
                </div>
            </div>
        </div>
    )
}