import { describe, it } from 'node:test'
import assert from 'node:assert'
import { SpottyClient } from '../src/spotify/client.js'


describe('is a test', () => {
    it('should return true', () => {
        assert.equal(1, 1)
    })
})

describe('spotify client', () => {
    it('should return access token', async () => {
        const client  = new SpottyClient()
        const info = await client.getTrackInfo('4cOdK2wGLETKBW3PvgPWqT')
        // console.log(info)
        assert.ok(info)
    })
})