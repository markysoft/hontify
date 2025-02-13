import { z } from 'zod'
import { CurrentlyPlayingTrackResponseSchema } from '../responses/CurrentlyPlayingResponse'
import { toTrack } from './toTrack'


export const CurrentlyPlayingSchema = CurrentlyPlayingTrackResponseSchema.transform((val) => toTrack(val.item))

export function getImages(images: { height: number, url: string }[]): { thumb: string, medium: string, large: string } {
    const [thumb, medium, large] = images.sort((a, b) => a.height - b.height).map((image) => image.url)
    return { thumb, medium, large }
}

export type CurrentlyPlaying = z.infer<typeof CurrentlyPlayingSchema>