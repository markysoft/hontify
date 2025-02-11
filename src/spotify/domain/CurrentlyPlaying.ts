import { z } from 'zod'
import { CurrentlyPlayingTrackResponseSchema } from '../responses/CurrentlyPlayingResponse'


export const CurrentlyPlayingSchema = CurrentlyPlayingTrackResponseSchema.transform((val) => {
    return {
        name: val.item.name,
        artist: val.item.artists.map((artist) => artist.name).join(' & '),
        duration: convertMillisecondsToMinutesAndSeconds(val.item.duration_ms),
        url: val.item.external_urls.spotify,
        album: {
            name: val.item.album.name,
            url: val.item.album.external_urls.spotify,
            track: val.item.track_number,
            totalTracks: val.item.album.total_tracks,
            type: val.item.album.album_type,
            releaseDate: val.item.album.release_date,
            artists: val.item.album.artists.map((artist) => artist.name)
        },
        images: getImages(val.item.album.images)
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

export type CurrentlyPlaying = z.infer<typeof CurrentlyPlayingSchema>