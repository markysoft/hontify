import { FC } from 'hono/jsx'
import { RecentlyPlayedItem } from '../../services/spotify/domain/RecentlyPlayed'
import { CurrentlyPlaying } from '../../services/spotify/domain/CurrentlyPlaying'


export const SongCard: FC<{ song: RecentlyPlayedItem | CurrentlyPlaying, size: string }> =
    (props: { song: RecentlyPlayedItem | CurrentlyPlaying, size: string }) => {
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