import { CurrentlyPlaying, CurrentlyPlayingSchema } from './domain/CurrentlyPlaying'
import { RecentlyPlayed, RecentlyPlayedSchema } from './domain/RecentlyPlayed'
import { CurrentlyPlayingTrackResponse, CurrentlyPlayingTrackResponseSchema } from './responses/CurrentlyPlayingResponse'
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
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50' + beforeString, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken },
        })
        const json = await response.json() as unknown
        if (response.ok) {
            return RecentlyPlayedSchema.parse(json)
        }
        throw new Error('Failed to get recent songs')
    }

    async getCurrentlyPlaying(accessToken: string): Promise<CurrentlyPlaying> {
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken },
        })
        const json = await response.json() as unknown
        if (response.ok) {
            return CurrentlyPlayingSchema.parse(json)
        }
        console.log(json)
        throw new Error('Failed to get current song')
    }
}