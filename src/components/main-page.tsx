/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from 'hono/jsx'
import { Layout } from './layout'

export const MainPage: FC = () => {
    return (
        <Layout title="Hontify">
            <div class="columns">
                <div class="column is-half">
                    <div hx-get="/recent-songs" hx-trigger="load"></div>
                </div>
            </div>
        </Layout>
    )
}

