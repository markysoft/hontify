import { z } from 'zod'
// thanks to https://transform.tools/json-to-zod for the conversion tool
export const RecentlyPlayedItemMinSchema = z.object({
    track: z.object({
        album: z.object({
            album_type: z.string(),
            artists: z.array(
                z.object({
                    external_urls: z.object({ spotify: z.string() }),
                    name: z.string(),
                })
            ),
            external_urls: z.object({ spotify: z.string() }),
            images: z.array(
                z.object({
                    height: z.number(),
                    url: z.string(),
                    width: z.number()
                })
            ),
            name: z.string(),
            release_date: z.string(),
            release_date_precision: z.string(),
            total_tracks: z.number(),
            type: z.string(),
            uri: z.string()
        }),
        artists: z.array(
            z.object({
                external_urls: z.object({ spotify: z.string() }),
                name: z.string(),
            })
        ),
        duration_ms: z.number(),
        external_urls: z.object({ spotify: z.string() }),
        name: z.string(),
        track_number: z.number(),
    }),
    played_at: z.string(),
    context: z.object({
        href: z.string(),
        external_urls: z.object({ spotify: z.string() }),
        uri: z.string()
    })
})


export const RecentlyPlayedResponseMinSchema = z.object(
    {
        items: z.array(RecentlyPlayedItemMinSchema),
        next: z.string(),
        cursors: z.object({ after: z.coerce.number(), before: z.coerce.number() }),
        limit: z.number(),
        href: z.string()
    },

)

export type RecentlyPlayedItemMin = z.infer<typeof RecentlyPlayedItemMinSchema>
export type RecentlyPlayedResponseMin = z.infer<typeof RecentlyPlayedResponseMinSchema>