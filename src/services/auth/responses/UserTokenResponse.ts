import { z } from 'zod'

export const UserTokenResponseSchema = z.object({
    access_token: z.string(),
    refresh_token: z.string().optional(),
    expires_in: z.number(),
    scope: z.string(),
    token_type: z.string(),
})

export type UserTokenResponse = z.infer<typeof UserTokenResponseSchema>