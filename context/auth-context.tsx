"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { refreshTokens } from "@/lib/api/auth"
import type { User, AuthTokens } from "@/types/auth"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
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
      try {
        // Check if we have a refresh token in localStorage
        const storedRefreshToken = localStorage.getItem("refreshToken")

        if (storedRefreshToken) {
          // Try to refresh the tokens
          const { user: userData, tokens: newTokens } = await refreshTokens(storedRefreshToken)

          setUser(userData)
          setTokensState(newTokens)

          // Store the new refresh token
          localStorage.setItem("refreshToken", newTokens.refreshToken)
        }
      } catch (error) {
        // If refresh fails, clear everything
        localStorage.removeItem("refreshToken")
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
    localStorage.setItem("refreshToken", newTokens.refreshToken)
  }

  const logout = () => {
    setUser(null)
    setTokensState(null)
    localStorage.removeItem("refreshToken")
  }

  const getAccessToken = async (): Promise<string | null> => {
    if (!tokens) return null

    // Check if access token is expired (or about to expire)
    const tokenExpiration = JSON.parse(atob(tokens.accessToken.split(".")[1])).exp * 1000
    const isExpired = Date.now() >= tokenExpiration - 60000 // 1 minute buffer

    if (isExpired) {
      try {
        // Try to refresh the token
        const { tokens: newTokens } = await refreshTokens(tokens.refreshToken)
        setTokens(newTokens)
        return newTokens.accessToken
      } catch (error) {
        // If refresh fails, log the user out
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
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

