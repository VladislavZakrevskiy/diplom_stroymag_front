import type { User, AuthTokens } from '@/types/auth'
import { API_URL } from '@/env'
import { $fetch } from '../fetch'

// Login user
export async function login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    try {
        const response = await $fetch(`/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Ошибка авторизации')
        }

        return await response.json()
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

// Register user
export async function register(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
}): Promise<{ user: User; tokens: AuthTokens }> {
    try {
        const response = await $fetch(`/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Ошибка регистрации')
        }

        return await response.json()
    } catch (error) {
        console.error('Register error:', error)
        throw error
    }
}

// Refresh tokens
export async function refreshTokens(refreshToken: string): Promise<{ user: User; tokens: AuthTokens }> {
    try {
        const response = await $fetch(`/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Ошибка обновления токена')
        }

        return await response.json()
    } catch (error) {
        console.error('Refresh token error:', error)
        throw error
    }
}

// Get user profile
export async function getUserProfile(accessToken: string): Promise<User> {
    try {
        const response = await $fetch(`/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Ошибка получения профиля')
        }

        return await response.json()
    } catch (error) {
        console.error('Get profile error:', error)
        throw error
    }
}

// Update user profile
export async function updateUserProfile(accessToken: string, userData: Partial<User>): Promise<User> {
    try {
        const response = await $fetch(`/users/me`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Ошибка обновления профиля')
        }

        return await response.json()
    } catch (error) {
        console.error('Update profile error:', error)
        throw error
    }
}

// Change password
export async function changePassword(
    accessToken: string,
    currentPassword: string,
    newPassword: string
): Promise<{ success: boolean }> {
    try {
        const response = await $fetch(`/auth/change-password`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Ошибка смены пароля')
        }

        return await response.json()
    } catch (error) {
        console.error('Change password error:', error)
        throw error
    }
}
