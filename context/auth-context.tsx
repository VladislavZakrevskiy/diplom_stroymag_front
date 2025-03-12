'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { refreshTokens } from '@/lib/api/auth'
import type { User, AuthTokens } from '@/types/auth'
import { CookieManager } from '@/lib/cookie/CookieManager'

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    isAdmin: boolean
    setUser: (user: User | null) => void
    setTokens: (tokens: AuthTokens) => void
    logout: () => void
    getAccessToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [tokens, setTokensState] = useState<AuthTokens | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const initAuth = async () => {
            const cookieManager = new CookieManager()
            try {
                const storedRefreshToken = cookieManager.get('refreshToken')

                if (storedRefreshToken) {
                    const { user: userData, tokens: newTokens } = await refreshTokens(storedRefreshToken)

                    setUser(userData)
                    setTokensState(newTokens)

                    cookieManager.set('refreshToken', newTokens.refreshToken, { expires: 1 })
                    cookieManager.set('accessToken', newTokens.accessToken, { expires: 31 })
                }
            } catch (error) {
                cookieManager.remove('refreshToken')
                cookieManager.remove('accessToken')

                setUser(null)
                setTokensState(null)
            } finally {
                setIsLoading(false)
            }
        }

        initAuth()
    }, [])

    const setTokens = (newTokens: AuthTokens) => {
        setTokensState(newTokens)
        localStorage.setItem('refreshToken', newTokens.refreshToken)
    }

    const logout = () => {
        setUser(null)
        setTokensState(null)
        localStorage.removeItem('refreshToken')
    }

    const getAccessToken = async (): Promise<string | null> => {
        if (!tokens) return null

        const tokenExpiration = JSON.parse(atob(tokens.accessToken.split('.')[1])).exp * 1000
        const isExpired = Date.now() >= tokenExpiration - 60000 //

        if (isExpired) {
            try {
                const { tokens: newTokens } = await refreshTokens(tokens.refreshToken)
                setTokens(newTokens)
                return newTokens.accessToken
            } catch (error) {
                logout()
                return null
            }
        }

        return tokens.accessToken
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                isAdmin: user?.role === 'ADMIN',
                setUser,
                setTokens,
                logout,
                getAccessToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
