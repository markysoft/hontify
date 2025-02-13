import { z } from 'zod'
import { CurrentlyPlayingTrackResponseSchema } from '../responses/CurrentlyPlayingResponse'
import { toTrack } from './toTrack'


export const TrackSchema = CurrentlyPlayingTrackResponseSchema.transform((val) => toTrack(val.item))

export type Track = z.infer<typeof TrackSchema>