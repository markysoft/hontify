import { describe, it } from 'node:test'
import assert from 'node:assert'
import { SpottyClient } from '../src/spotify/client'
import { Spotify } from '../src/spotify/Spotify'

describe('spotify client', () => {
    it('should return recent tracks', async () => {
        const client = new SpottyClient()
        const info = await client.getRecent()
        assert.ok(info)
    })
})

describe('spotify', () => {
    it('should return track info', async () => {
        const trackId = '4cOdK2wGLETKBW3PvgPWqT'
        const spotify = new Spotify()
        const info = await spotify.getTrackInfo(trackId)
        assert.ok(info)
        assert.equal(info.id, trackId)
        assert.equal(info.name, 'Never Gonna Give You Up')
    })
    it('should return recent tracks', async () => {
        const spotify = new Spotify()
        const info = await spotify.getRecent()
        console.log(info)
        assert.ok(info)
    })    
})