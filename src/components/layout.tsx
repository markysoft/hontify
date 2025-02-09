/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from 'hono/jsx'
import { Head } from './header'
import { NavBar } from './nav-bar'

export const Layout: FC<{ title: string, loggedIn: boolean, children: any }> = (props: { title: string, loggedIn: boolean, children: any }) => {
    return (
        <>
            <Head title={props.title} />
            <body>
                <section class="section">
                    <div class="container">

                        <NavBar title={props.title} loggedIn={props.loggedIn} />
                        <p class="subtitle">
                            <strong><a href="https://hono.dev/">Hono</a></strong> backend
                            with an <strong><a href="https://htmx.org/">HTMX</a></strong> frontend
                            using <strong><a href="https://bulma.io/">Bulma</a></strong> CSS
                        </p>
                        {props.children}
                    </div>
                </section>
            </body>
        </>
    )
}
