import { z } from 'zod'
import { TrackItemSchema } from './TrackItemSchema'

export const CurrentlyPlayingTrackResponseSchema = z.object({
    timestamp: z.number(),
    is_playing: z.boolean(),
    item: TrackItemSchema
})


export type CurrentlyPlayingTrackResponse = z.infer<typeof CurrentlyPlayingTrackResponseSchema>