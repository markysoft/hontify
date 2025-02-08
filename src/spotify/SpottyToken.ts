import { z } from 'zod'

export const SpottyTokenSchema = z.object({
    access_token: z.string(),
    expires_in: z.number(),
}).transform((val) => {
    const expires = Date.now() + val.expires_in * 1000
    return {
        accessToken: val.access_token,
        expired: () => Date.now() > expires

    }
})

export type SpottyToken = z.infer<typeof SpottyTokenSchema>