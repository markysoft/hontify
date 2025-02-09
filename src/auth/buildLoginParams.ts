import { spotify } from '../config'

export function buildLoginParams(scope: string, state: string) {
    return new URLSearchParams({
        response_type: 'code',
        client_id: spotify.clientId,
        scope,
        redirect_uri: spotify.redirectUri,
        state
    }).toString()
}
