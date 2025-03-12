import { AuthProvider } from '@/context/auth-context'
import { CartProvider } from '@/context/cart-context'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React, { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
    title: 'СтройМаркет - Магазин строительных материалов',
    description: 'Широкий выбор строительных материалов по доступным ценам',
    generator: 'v0.dev',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <AuthProvider>
                    <CartProvider>{children} </CartProvider>
                </AuthProvider>
            </body>
        </html>
    )
}

export default RootLayout
