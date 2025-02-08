import { describe, it } from 'node:test'
import assert from 'node:assert'
import { SpottyTokenSchema } from '../src/spotify/SpottyToken'

describe('SpottyToken', () => {
    it('should return non expired for new token', () => {
        const token = SpottyTokenSchema.parse({access_token: '123', expires_in: 1000})
        assert.ok(token)
        assert.equal(token.accessToken, '123')
        assert.equal(token.expired(), false)
    })
    it('should return expired for old token', () => {
        const token = SpottyTokenSchema.parse({ access_token: '123', expires_in: -1000 })
        assert.ok(token)
        assert.equal(token.accessToken, '123')
        assert.ok(token.expired())
    })
    it('hould return expired for token with less than 10 second expiry', () => {
        const token = SpottyTokenSchema.parse({ access_token: '123', expires_in: 9 })
        assert.ok(token)
        assert.equal(token.accessToken, '123')
        assert.ok(token.expired())
    })
})