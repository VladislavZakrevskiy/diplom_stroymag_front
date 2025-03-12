export interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    role: 'USER' | 'ADMIN'
    createdAt: string
}

export interface AuthTokens {
    accessToken: string
    refreshToken: string
}
