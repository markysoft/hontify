import { z } from 'zod'
import { TrackItemSchema } from './TrackItemSchema'

export const RecentlyPlayedItemSchema = z.object({
    track: TrackItemSchema,
    played_at: z.string(),
    context: z.object({
        href: z.string(),
        external_urls: z.object({ spotify: z.string() }),
        uri: z.string()
    })
})

export const RecentlyPlayedResponseSchema = z.object(
    {
        items: z.array(RecentlyPlayedItemSchema),
        next: z.string().nullable(),
        cursors: z.object({ after: z.coerce.number(), before: z.coerce.number() }).nullable(),
        limit: z.number(),
        href: z.string()
    },

)

export type RecentlyPlayedItem = z.infer<typeof RecentlyPlayedItemSchema>
export type RecentlyPlayedResponse = z.infer<typeof RecentlyPlayedResponseSchema>