import type { FC } from 'hono/jsx'
import { Layout } from './structure/layout'

export const MainPage: FC = () => {
    return (
        <Layout title="Hontify" loggedIn={true}>

            <div id='current-song' hx-get="/current-song" hx-trigger="load, every 30s"></div>
            <div id='recent-songs' hx-get="/recent-songs" hx-trigger="load, every 30s"></div>
        </Layout>
    )
}

