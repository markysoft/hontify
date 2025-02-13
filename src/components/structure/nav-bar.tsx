import type { FC } from 'hono/jsx'

export const NavBar: FC<{ title: string, loggedIn: boolean }> = (props: { title: string, loggedIn: boolean }) => {
    const logInfo = props.loggedIn ?
        { href: '/auth/logout', label: 'Log out' } :
        { href: '/auth/login', label: 'Log in' }
    return (
        <nav class="level">
            <div class="level-left">
                <div class="level-item">
                    <p class="subtitle is-5"><strong>{props.title}</strong></p>
                </div>
            </div>
            <div id="authControls" class="level-right" >
                <p class="level-item">
                    <a class="button is-success" href={logInfo.href}>{logInfo.label}</a>
                </p>
            </div>
        </nav>
    )
}
