import config from '../../config'
const { spotify } = config

function buildLoginParams(state: string) {
    return new URLSearchParams({
        response_type: 'code',
        client_id: spotify.clientId,
        scope: spotify.scope,
        redirect_uri: spotify.redirectUri,
        state
    }).toString()
}

export function getSpotifyLoginUrl(state: string) {
    return `https://accounts.spotify.com/authorize?${buildLoginParams(state)}`
}