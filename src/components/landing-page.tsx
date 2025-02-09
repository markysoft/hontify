import type { FC } from 'hono/jsx'
import { Layout } from './layout'

export const LandingPage: FC = () => {
    return (
        <Layout title="Hontify">
            <div class="columns">
                <div class="column is-half">
                   Log in above to get started
                </div>
            </div>
        </Layout>
    )
}
