import type { FC } from 'hono/jsx'
import { Layout } from './layout'

export const MainPage: FC<{ refreshInterval: number; }> = (props: { refreshInterval: number; }) => {
    const trigger = `load, every ${props.refreshInterval}s`
    return (
        <Layout title="Hontify" loggedIn={true}>
            <div id='current-song' hx-get="/spotify/current-song" hx-trigger={trigger}></div>
            <div id='recent-songs' hx-get="/spotify/recent-songs" hx-trigger="load, currentSongUpdated from:body"></div>
        </Layout>
    )
}

