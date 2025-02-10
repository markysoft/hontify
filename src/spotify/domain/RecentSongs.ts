import { z } from 'zod'

export const RecentSongSchema = z.object({
    track: z.object({
        album: z.object({
            album_type: z.string(),
            artists: z.array(
                z.object({
                    external_urls: z.object({ spotify: z.string() }),
                    href: z.string(),
                    id: z.string(),
                    name: z.string(),
                    type: z.string(),
                    uri: z.string()
                })
            ),
            available_markets: z.array(z.string()),
            external_urls: z.object({ spotify: z.string() }),
            href: z.string(),
            id: z.string(),
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
                href: z.string(),
                id: z.string(),
                name: z.string(),
                type: z.string(),
                uri: z.string()
            })
        ),
        available_markets: z.array(z.string()),
        disc_number: z.number(),
        duration_ms: z.number(),
        explicit: z.boolean(),
        external_ids: z.object({ isrc: z.string() }),
        external_urls: z.object({ spotify: z.string() }),
        href: z.string(),
        id: z.string(),
        is_local: z.boolean(),
        name: z.string(),
        popularity: z.number(),
        preview_url: z.null(),
        track_number: z.number(),
        type: z.string(),
        uri: z.string()
    }),
    played_at: z.string(),
    context: z.object({
        type: z.string(),
        href: z.string(),
        external_urls: z.object({ spotify: z.string() }),
        uri: z.string()
    })
})


export const RecentSongsSchema = z.object(
    {
        items: z.array(RecentSongSchema),
        next: z.string(),
        cursors: z.object({ after: z.coerce.number(), before: z.coerce.number() }),
        limit: z.number(),
        href: z.string()
    },

)

export type RecentSong = z.infer<typeof RecentSongSchema>
export type RecentSongs = z.infer<typeof RecentSongsSchema>