import { z } from 'zod'

export const ConfigSchema = z.object({
    spotify: z.object({
        clientId: z.string(),
        clientSecret: z.string(),
        redirectUri: z.string().default('http://localhost:3000/auth/callback'),
        refreshInterval: z.coerce.number().default(30),
        scope: z.string(),
    }).transform(val => {
        return { ...val, authcode: Buffer.from(`${val.clientId}:${val.clientSecret}`).toString('base64') }
    }),
    port: z.coerce.number().default(3000)
})

export default ConfigSchema.parse(
    {
        spotify: {
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI,
            refreshInterval: process.env.REFRESH_INTERVAL,
            scope: 'user-read-private user-read-email user-read-recently-played user-read-currently-playing',
        },
        port: process.env.PORT
    }
)
