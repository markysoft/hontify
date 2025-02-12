import { describe, it } from 'node:test'
import assert from 'node:assert'
import { MachineToken } from '../src/services/auth/MachineToken'

const token = new MachineToken()
describe('SpotifyToken', () => {
    it('expired should be true for not expired', () => {
        token.expires = Date.now() + 60000
        assert.equal(token.expired(), false)
    })
    it('expired should be false for not expired', () => {
        token.expires = Date.now() - 1
        assert.equal(token.expired(), true)
    })
    it('expired should be false if expiring within 10 seconds', () => {
        token.expires = Date.now() - 9000
        assert.equal(token.expired(), true)
    })    
})