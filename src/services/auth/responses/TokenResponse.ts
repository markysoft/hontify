import { z } from 'zod'

export const TokenResponseSchema = z.object({
    access_token: z.string(),
    expires_in: z.number(),
})

export type TokenResponse = z.infer<typeof TokenResponseSchema>