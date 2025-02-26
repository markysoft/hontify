import { Track, TrackSchema } from './domain/Track'
import { RecentlyPlayed, RecentlyPlayedSchema } from './domain/RecentlyPlayed'
import { MachineToken } from '../auth/MachineToken'

export class Spotify {
    spotifyToken: MachineToken
    constructor() {
        this.spotifyToken = new MachineToken()
    }
    async getTrackInfo(trackId: string) {
        const token = await this.spotifyToken.getAccessToken()
        const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
        })
        return await response.json()
    }

    async getRecent(accessToken: string): Promise<RecentlyPlayed> {
        const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken },
        })
        const json = await response.json() as unknown
        if (response.ok) {
            return RecentlyPlayedSchema.parse(json)
        }
        throw new Error('Failed to get recent songs')
    }

    async getCurrentlyPlaying(accessToken: string): Promise<Track | undefined> {
        const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken },
        })
        if (response.ok) {
            if (response.statusText === 'No Content') {
                return undefined
            }
            const json = await response.json() as unknown
            return TrackSchema.parse(json)
        }
        throw new Error('Failed to get current song')
    }
}