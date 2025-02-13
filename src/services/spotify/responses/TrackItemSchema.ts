import { z } from 'zod'

export const TrackItemSchema = z.object({
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
})
