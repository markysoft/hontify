/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from 'hono/jsx'
import { NavBar } from './nav-bar'

export const Layout: FC<{ title: string, loggedIn: boolean, children: any }> = (props: { title: string, loggedIn: boolean, children: any }) => {
    return (
        <>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{props.title}</title>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"
                ></link>
                <script src="https://kit.fontawesome.com/c2b6fd3803.js" crossorigin="anonymous"></script>
                <script src="https://unpkg.com/htmx.org@2.0.4"
                    integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+"
                    crossorigin="anonymous"></script>
            </head>
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
