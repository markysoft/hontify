import type { FC } from 'hono/jsx'


export const NavBar: FC<{ title: string, loggedIn: boolean }> = (props: { title: string, loggedIn: boolean }) => {
    return (
        <nav class="level">
            <div class="level-left">
                <div class="level-item">
                    <p class="subtitle is-5"><strong>{props.title}</strong></p>
                </div>
            </div>
            <div id="authControls" class="level-right" >
                {props.loggedIn ? (
                    <p class="level-item"><a class="button is-success" href='logout'>Log out</a></p>
                ) : (
                    <p class="level-item"><a class="button is-success" href='login'>Log in</a></p>
                )}
            </div>
        </nav>
    )
}
