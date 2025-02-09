export const
    spotify = {
        clientId: process.env.SPOTIFY_CLIENT_ID ?? '',
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
        redirectUri: process.env.SPOTIFY_REDIRECT_URI ?? 'http://localhost:3000/callback' 
    }
