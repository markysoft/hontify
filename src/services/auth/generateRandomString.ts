import { randomBytes } from 'crypto'

export function generateRandomString (length: number) : string {
    return randomBytes(60).toString('hex').slice(0, length)
}
