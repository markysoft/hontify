/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from 'hono/jsx'

export const LayoutBody: FC<{ title:string, children: any }> = (props: { title: string, children: any }) => {
    return (
            <body>
                <section class="section">
                    <div class="container">
                        
                        <nav class="level">
                            <div class="level-left">
                                <div class="level-item">
                                    <p class="subtitle is-5"><strong>{props.title}</strong></p>
                                </div>
                            </div>
                            <div id="authControls" class="level-right">
                                <p class="level-item"><a class="button is-success" href='login'>Log in</a></p>
                            </div>
                        </nav>
                        <p class="subtitle">
                            <strong><a href="https://hono.dev/">Hono</a></strong> backend
                            with an <strong><a href="https://htmx.org/">HTMX</a></strong> frontend
                            using <strong><a href="https://bulma.io/">Bulma</a></strong> CSS
                        </p>  
                        {props.children}
                    </div>
                </section>
            </body>
    )
}
