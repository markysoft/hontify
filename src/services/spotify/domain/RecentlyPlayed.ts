import { z } from 'zod'
import { RecentlyPlayedResponseSchema } from '../responses/RecentlyPlayedResponse'
import { toTrack } from './toTrack'

export const RecentlyPlayedItemSchema = z.object({
    name: z.string(),
    artist: z.string(),
    duration: z.string(),
    url: z.string(),
    playedAt: z.date().optional(),
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
        items: val.items.map((item) => toTrack(item.track, new Date(item.played_at)))
    }
})

export type RecentlyPlayed = z.infer<typeof RecentlyPlayedSchema>
export type RecentlyPlayedItem = z.infer<typeof RecentlyPlayedItemSchema>