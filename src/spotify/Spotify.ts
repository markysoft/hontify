import { RecentlyPlayedSchema } from './domain/RecentlyPlayed'
import { SpotifyToken } from './SpotifyToken'

export class Spotify {
    spotifyToken: SpotifyToken
    constructor() {
        this.spotifyToken = new SpotifyToken()
    }
    async getTrackInfo(trackId: string) {
        const token = await this.spotifyToken.getAccessToken()
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        })
        return await response.json()
    }
    async getRecent(accessToken: string) {
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken },
        })
        const json = await response.json() as unknown
        if (response.ok) {
            return RecentlyPlayedSchema.parse(json)
        }
        throw new Error('Failed to get recent songs')
    }
}