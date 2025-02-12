import { describe, it } from 'node:test'
import assert from 'node:assert'
import { Spotify } from '../src/services/spotify/Spotify'

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
        assert.rejects(
            async () => { await spotify.getRecent('') },
            {
                name: 'Error',
                message: 'Failed to get recent songs',
            }
        )
    })    
})