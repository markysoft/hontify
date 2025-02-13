import { z } from 'zod'
import { RecentlyPlayedResponseSchema } from '../responses/RecentlyPlayedResponse'
import { toTrack } from './toTrack'

export const RecentlyPlayedSchema = RecentlyPlayedResponseSchema.transform((val) => {
    return {
        next: val.next,
        limit: val.limit,
        href: val.href,
        items: val.items.map((item) => toTrack(item.track, new Date(item.played_at)))
    }
})

export type RecentlyPlayed = z.infer<typeof RecentlyPlayedSchema>