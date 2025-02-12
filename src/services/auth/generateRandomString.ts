import { randomBytes } from 'crypto'

export const generateRandomString = (length: number) => {
    return randomBytes(60).toString('hex').slice(0, length)
}
