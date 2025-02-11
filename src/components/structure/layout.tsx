/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from 'hono/jsx'
import { NavBar } from './nav-bar'

export const Layout: FC<{ title: string, loggedIn: boolean, children: any }> = (props: { title: string, loggedIn: boolean, children: any }) => {
    return (
        <>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="htmx-config" content='{"responseHandling": [{"code":"204", "swap": false},{"code":"...", "swap": true}]}' />
                <title>{props.title}</title>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"
                ></link>
                <script src="https://kit.fontawesome.com/c2b6fd3803.js" crossorigin="anonymous"></script>
                <script src="https://unpkg.com/htmx.org@2.0.4"
                    integrity="sha384-HGfztofotfshcF7+8n44JQL2oJmowVChPTg48S+jvZoztPfvwD79OC/LTtG6dMp+"
                    crossorigin="anonymous"></script>
                <style>
                {`
                    .footer {
                        --bulma-footer-padding: 3rem 1.5rem 3rem;
                    }
                `}
                </style>
            </head>
            <body>
                <section class="section">
                    <div class="container">

                        <NavBar title={props.title} loggedIn={props.loggedIn} />

                        {props.children}
                        <footer class="footer">
                            <div class="content has-text-centered">
                                <strong><a href="https://hono.dev/" target="_blank">Hono</a></strong> backend
                                with an <strong><a href="https://htmx.org/" target="_blank">HTMX</a></strong> frontend
                                using <strong><a href="https://bulma.io/" target="_blank">Bulma</a></strong> CSS
                            </div>
                        </footer>
                    </div>
                </section>
            </body>
        </>
    )
}
