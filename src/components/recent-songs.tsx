/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC } from 'hono/jsx'

export const SongCard: FC = (props) => {
    return (
        <div class="cell">
            <div class="card-image">
                <figure class="image">
                    <img
                        src={props.song.images.medium}
                        alt="Placeholder image"
                    />
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    <a href={props.song.url}>{props.song.name}</a><br/>
                    {props.song.artist} - {props.song.album.name}
                </div>
            </div>
        </div>
    )
}

export const RecentSongs: FC = (props) => {
    return (
        < >
            <h2 class="title has-text-primary-15">Recent Songs</h2>
            <div class="grid is-col-min-9">
                {props.recentlyPlayed.items.map((song: any) => <SongCard song={song} />)}
            </div>            
        </>
    )
}