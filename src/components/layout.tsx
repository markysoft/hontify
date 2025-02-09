/* eslint-disable @typescript-eslint/no-explicit-any */

import type { FC } from 'hono/jsx'
import { Head } from './header'
import { LayoutBody } from './layout-body'

export const Layout: FC<{ title:string, children: any }> = (props: { title: string, children: any }) => {
    return (
        <>
            <Head title={props.title}/>
            <LayoutBody title={props.title} children={props.children}/>
        </>
    )
}
