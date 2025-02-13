import { z } from 'zod'
import { RecentlyPlayedResponseSchema } from '../responses/RecentlyPlayedResponse'

export const RecentlyPlayedItemSchema = z.object({
    name: z.string(),
    artist: z.string(),
    duration: z.string(),
    url: z.string(),
    playedAt: z.date(),
    album: z.object({
        name: z.string(),
        url: z.string(),
        track: z.number(),
        totalTracks: z.number(),
        type: z.string(),
        releaseDate: z.string(),
        artists: z.array(z.string())
    }),
    images: z.object({
        thumb: z.string(),
        medium: z.string(),
        large: z.string()
    })
})

export const RecentlyPlayedSchema = RecentlyPlayedResponseSchema.transform((val) => {
    return {
        next: val.next,
        limit: val.limit,
        href: val.href,
        items: val.items.map((item) => {
            return {
                name: item.track.name,
                artist: item.track.artists.map((artist) => artist.name).join(' & '),
                duration: convertMillisecondsToMinutesAndSeconds(item.track.duration_ms),
                url: item.track.external_urls.spotify,
                playedAt: new Date(item.played_at),
                album: {
                    name: item.track.album.name,
                    url: item.track.album.external_urls.spotify,
                    track: item.track.track_number,
                    totalTracks: item.track.album.total_tracks,
                    type: item.track.album.album_type,
                    releaseDate: item.track.album.release_date,
                    artists: item.track.album.artists.map((artist) => artist.name)
                },
                images: getImages(item.track.album.images)
            }
        })
    }
})

function convertMillisecondsToMinutesAndSeconds(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    const formattedMinutes = minutes < 1 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${formattedMinutes}:${formattedSeconds}`
}

function getImages(images: { height: number, url: string }[]): { thumb: string, medium: string, large: string } {
    const [thumb, medium, large] = images.sort((a, b) => a.height - b.height).map((image) => image.url)
    return { thumb, medium, large }
}

export type RecentlyPlayed = z.infer<typeof RecentlyPlayedSchema>
export type RecentlyPlayedItem = z.infer<typeof RecentlyPlayedItemSchema>