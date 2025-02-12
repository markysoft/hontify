import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { RecentlyPlayedSchema } from '../../src/services/spotify/domain/RecentlyPlayed'


describe('RecentlyPlayed Schema validation', () => {
    it('should reshape response', async () => {

        const text = readFileSync(__dirname + '/../test-data/two-recent-songs.json', 'utf-8')
        const json = JSON.parse(text)
        const recentSongs = RecentlyPlayedSchema.parse(json)
        assert.ok(recentSongs)
        assert.equal(recentSongs.items.length, 2)
        assert.equal(recentSongs.limit, 2)
        assert.equal(recentSongs.href, 'https://api.spotify.com/v1/me/player/recently-played?limit=2')
        // assert.equal(recentSongs.older, 'https://api.spotify.com/v1/me/player/recently-played?before=1739185762955')
        // assert.equal(recentSongs.newer, 'https://api.spotify.com/v1/me/player/recently-played?before=1739186300827')

        assert.equal(recentSongs.items.length, 2)

        const firstSong = recentSongs.items[0]
        assert.equal(firstSong.name, 'Ivy')
        assert.equal(firstSong.duration, '8:57')
        assert.equal(firstSong.playedAt.getTime(), new Date('2025-02-10T11:18:20.827Z').getTime())

        assert.equal(firstSong.url, 'https://open.spotify.com/track/0N7XRzdgrGlhGbaXbFuu46')
        assert.equal(firstSong.album.track, 2)
        assert.equal(firstSong.album.totalTracks, 7)
        assert.equal(firstSong.album.type, 'album')
        assert.equal(firstSong.album.releaseDate, '2021-11-26')
        assert.equal(firstSong.artist, 'Richard Dawson & Circle')
        assert.equal(firstSong.album.artists.length, 2)
        assert.equal(firstSong.album.artists[0], 'Richard Dawson')
        assert.equal(firstSong.album.artists[1], 'Circle')
        assert.equal(firstSong.album.name, 'Henki')
        assert.equal(firstSong.album.url, 'https://open.spotify.com/album/6X4ALVBUeQnMHR5tsK8ymx')
        assert.equal(firstSong.images.thumb, 'https://i.scdn.co/image/ab67616d00004851ed5995a2023faa81a556344f')
        assert.equal(firstSong.images.medium, 'https://i.scdn.co/image/ab67616d00001e02ed5995a2023faa81a556344f')
        assert.equal(firstSong.images.large, 'https://i.scdn.co/image/ab67616d0000b273ed5995a2023faa81a556344f')
    })
})