/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from 'hono/jsx'

export const Head: FC<{ title:string}> = (props: { title: string }) => {
    return (
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
    )
}
