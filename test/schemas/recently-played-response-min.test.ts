import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { RecentlyPlayedResponseMinSchema } from '../../src/services/spotify/responses/RecentlyPlayedResponseMin'


describe('RecentlyPlayedResponseMinSchema Schema validation', () => {
    it('should parse valid response', async () => {

        const text = readFileSync(__dirname + '/../test-data/two-recent-songs.json', 'utf-8')
        const json = JSON.parse(text)
        const recentSongs = RecentlyPlayedResponseMinSchema.parse(json)
        assert.ok(recentSongs)
        assert.equal(recentSongs.items.length, 2)
        assert.equal(recentSongs.limit, 2)
        assert.equal(recentSongs.href, 'https://api.spotify.com/v1/me/player/recently-played?limit=2')
        assert.equal(recentSongs.next, 'https://api.spotify.com/v1/me/player/recently-played?before=1739185762955&limit=2')
        const firstSong = recentSongs.items[0]
        assert.equal(firstSong.track.name, 'Ivy')
        assert.equal(firstSong.track.duration_ms, 537880)
        assert.equal(firstSong.played_at, '2025-02-10T11:18:20.827Z')
        assert.equal(firstSong.track.track_number, 2)
        assert.equal(firstSong.track.album.total_tracks, 7)
        assert.equal(firstSong.track.album.type, 'album')
        assert.equal(firstSong.track.album.release_date, '2021-11-26')
        assert.equal(firstSong.track.album.artists[0].name, 'Richard Dawson')
        assert.equal(firstSong.track.album.artists[1].name, 'Circle')
        assert.equal(firstSong.track.album.name, 'Henki')
        assert.equal(firstSong.track.external_urls.spotify, 'https://open.spotify.com/track/0N7XRzdgrGlhGbaXbFuu46')
        assert.equal(firstSong.context.external_urls.spotify, 'https://open.spotify.com/album/6X4ALVBUeQnMHR5tsK8ymx')
        assert.equal(firstSong.track.album.images.length, 3)
        assert.equal(firstSong.track.album.images[0].url, 'https://i.scdn.co/image/ab67616d0000b273ed5995a2023faa81a556344f')
        assert.equal(firstSong.track.album.images[0].height, 640)
        assert.equal(firstSong.track.album.images[0].width, 640)
        assert.equal(firstSong.track.album.images[1].url, 'https://i.scdn.co/image/ab67616d00001e02ed5995a2023faa81a556344f')
        assert.equal(firstSong.track.album.images[1].height, 300)
        assert.equal(firstSong.track.album.images[1].width, 300)
        assert.equal(firstSong.track.album.images[2].url, 'https://i.scdn.co/image/ab67616d00004851ed5995a2023faa81a556344f')
        assert.equal(firstSong.track.album.images[2].height, 64)
        assert.equal(firstSong.track.album.images[2].width, 64)
    })
})