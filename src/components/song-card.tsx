import { FC } from 'hono/jsx'
import { RecentlyPlayedItem } from '../services/spotify/domain/RecentlyPlayed'


export const SongCard: FC<{ song: RecentlyPlayedItem; }> = (props: { song: RecentlyPlayedItem; }) => {
    return (
        <div class="cell">
            <div class="card-image">
                <figure class="image">
                    <img
                        src={props.song.images.medium}
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
    )
}
