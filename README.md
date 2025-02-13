# Hono, HTMX, and Spotify

Sample project demonstrating using Hono as web server for HATEOAS site.

[Hono](https://hono.dev) backend, [HTMX](https://htmx.org) frontend, and [Bulma](https://bulma.io) CSS
                     

Sign up at [https://developer.spotify.com/](https://developer.spotify.com/) and follow the instructions to create an app. The following values will need to be set to run locally:



|Name                 | Description           |
|---------------------|-----------------------|
|SPOTIFY_CLIENT_ID    | Spotify client ID     |
|SPOTIFY_CLIENT_SECRET| Spotify client Secret |
|SPOTIFY_REDIRECT_URI | Spotify redirect URI  |
|HONO_HOSTNAME        | Hostname              |

Spotify are restricting the use of `localhost`, so you may want to use `127.0.0.1` as the host name instead.

## Install and Run
```
npm install
npm run dev
```

visit http://127.0.0.1:3000

Shout out to to https://transform.tools/json-to-zod for the conversion tool!