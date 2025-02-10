import { RecentlyPlayed, RecentlyPlayedSchema } from './domain/RecentlyPlayed'
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
    async getRecent(accessToken: string, before: string | undefined): Promise<RecentlyPlayed> {
        const beforeString = before ? `&before=${before}` : ''
        console.log('beforeString', beforeString)
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=24' + beforeString, {
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