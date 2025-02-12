import type { FC } from 'hono/jsx'
import { Layout } from '../structure/layout'
import { ErrorMessage } from '../structure/error-message'

export const ErrorPage: FC<{ message: string, loggedIn: boolean }> =
    (props: { message: string, loggedIn: boolean }) => {
        return (
            <Layout title="Hontify" loggedIn={props.loggedIn}>
                <ErrorMessage message={props.message} />
            </Layout>
        )
    }
