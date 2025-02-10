import type { FC } from 'hono/jsx'
import { Layout } from './structure/layout'

export const MainPage: FC = () => {
    return (
        <Layout title="Hontify" loggedIn={true}>
            <div class="columns">
                <div class="column is-half">
                    <div hx-get="/recent-songs" hx-trigger="load"></div>
                </div>
            </div>
        </Layout>
    )
}

