/* eslint-disable @typescript-eslint/no-explicit-any */

import { FC } from 'hono/jsx'

export const RecentSongs: FC = (props) => {
    return (
        <div class="content">
            <h2 class="title has-text-primary-15">Recent Songs</h2>
            <ul>
                {props.songs.map((song: any) => {
                    return <li>{song.name}, {song.artist} <a href={song.link}>Listen</a></li>
                })}
            </ul>
        </div>
    )
}