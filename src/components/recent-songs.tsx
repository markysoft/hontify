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
                    {props.song.name}, {props.song.artist} <a href={props.song.url}>Listen</a>
                </div>
            </div>
        </div>
    )
}

export const RecentSongs: FC = (props) => {
    const nextUrl = props.recentlyPlayed.next ? `/recent-songs?before=${props.recentlyPlayed.before}` : undefined
    return (
        < >
            { nextUrl &&  <button class="button is-info"  hx-get={nextUrl} hx-target="#recent-songs">Older</button> }
            <h2 class="title has-text-primary-15">Recent Songs</h2>
            <div class="grid is-col-min-8">
                {props.recentlyPlayed.items.map((song: any) => <SongCard song={song} />)}
            </div>
            
        </>
    )
}