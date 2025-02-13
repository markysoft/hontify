import { TrackItem } from '../responses/TrackItemSchema'

export function convertMillisecondsToMinutesAndSeconds(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    const formattedMinutes = minutes < 1 ? `0${minutes}` : minutes
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
    return `${formattedMinutes}:${formattedSeconds}`
}
export function getImages(images: { height: number, url: string }[]): { thumb: string, medium: string, large: string } {
    const [thumb, medium, large] = images.sort((a, b) => a.height - b.height).map((image) => image.url)
    return { thumb, medium, large }
}

export function toTrack(track: TrackItem, playedAt?: Date) {
    return {
        name: track.name,
        artist: track.artists.map((artist) => artist.name).join(' & '),
        duration: convertMillisecondsToMinutesAndSeconds(track.duration_ms),
        url: track.external_urls.spotify,
        playedAt: playedAt,
        album: {
            name: track.album.name,
            url: track.album.external_urls.spotify,
            track: track.track_number,
            totalTracks: track.album.total_tracks,
            type: track.album.album_type,
            releaseDate: track.album.release_date,
            artists: track.album.artists.map((artist) => artist.name)
        },
        images: getImages(track.album.images)
    }
}
