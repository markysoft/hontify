import { z } from 'zod'

export const ErrorResponseSchema = z.object({
    error: z.string(),
    error_description: z.number(),
})

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>