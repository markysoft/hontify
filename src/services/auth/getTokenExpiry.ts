export function getTokenExpiry(expiresIn: number) {
    return new Date(Date.now() + ((expiresIn - 10) * 1000))
}