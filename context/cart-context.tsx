'use client'

import { createContext, useContext, useState, useEffect, type ReactNode, useRef } from 'react'
import { useAuth } from './auth-context'
import { getCart, addItemToCart, updateCartItemQuantity, removeCartItem } from '@/lib/api/cart'
import type { Cart, CartItem } from '@/types/cart'
import type { Product } from '@/types/product'
import { CookieManager } from '@/lib/cookie/CookieManager'

interface CartContextType {
    cart: Cart | null
    isLoading: boolean
    addToCart: (product: Product, quantity?: number) => Promise<void>
    updateQuantity: (productId: string, quantity: number) => Promise<void>
    removeItem: (productId: string) => Promise<void>
    clearCart: () => Promise<void>
    isInCart: (productId: string) => boolean
    getItemQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const { isAuthenticated } = useAuth()
    const [cart, setCart] = useState<Cart | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const cookieManager = useRef(new CookieManager())

    useEffect(() => {
        const initCart = async () => {
            setIsLoading(true)

            try {
                if (!isAuthenticated) {
                    const storedCart = localStorage.getItem('guestCart')
                    if (storedCart) {
                        setCart(JSON.parse(storedCart))
                    } else {
                        setCart({
                            id: 'guest',
                            items: [],
                            userId: 'guest',
                        })
                    }
                } else {
                    const accessToken = cookieManager.current.get('accessToken')
                    if (accessToken) {
                        const cartData = await getCart(accessToken)
                        setCart(cartData)
                    }
                }
            } catch (error) {
                console.error('Failed to initialize cart:', error)
            } finally {
                setIsLoading(false)
            }
        }

        initCart()
    }, [isAuthenticated])

    useEffect(() => {
        if (!isAuthenticated && cart && cart.id === 'guest') {
            localStorage.setItem('guestCart', JSON.stringify(cart))
        }
    }, [cart, isAuthenticated])

    const calculateCartTotals = (items: CartItem[]) => {
        const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        return {
            subtotal,
            total: subtotal,
            discount: 0,
        }
    }

    const addToCart = async (product: Product, quantity = 1) => {
        if (!cart) return

        setIsLoading(true)

        try {
            if (isAuthenticated) {
                const accessToken = cookieManager.current.get('accessToken')
                if (accessToken) {
                    const updatedCart = await addItemToCart(accessToken, product.id, quantity)
                    setCart(updatedCart)
                }
            } else {
                const existingItemIndex = cart.items.findIndex((item) => item.productId === product.id)

                let updatedItems: CartItem[]
                if (existingItemIndex >= 0) {
                    updatedItems = [...cart.items]
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: updatedItems[existingItemIndex].quantity + quantity,
                    }
                } else {
                    updatedItems = [
                        ...cart.items,
                        {
                            id: `guest-${Date.now()}`,
                            product,
                            productId: product.id,
                            cart: cart,
                            cartId: cart.id,
                            createdAt: new Date().toISOString(),
                            quantity: 1,
                            updatedAt: new Date().toISOString(),
                        },
                    ]
                }

                setCart({
                    ...cart,
                    items: updatedItems,
                })
            }
        } catch (error) {
            console.error('Failed to add item to cart:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const updateQuantity = async (productId: string, quantity: number) => {
        if (!cart) return

        setIsLoading(true)

        try {
            if (isAuthenticated) {
                const accessToken = cookieManager.current.get('accessToken')
                if (accessToken) {
                    const updatedCart = await updateCartItemQuantity(accessToken, productId, quantity)
                    setCart(updatedCart)
                }
            } else {
                // Update local cart
                const itemIndex = cart.items.findIndex((item) => item.productId === productId)

                if (itemIndex >= 0) {
                    const updatedItems = [...cart.items]

                    if (quantity <= 0) {
                        // Remove item if quantity is 0 or less
                        updatedItems.splice(itemIndex, 1)
                    } else {
                        // Update quantity
                        updatedItems[itemIndex] = {
                            ...updatedItems[itemIndex],
                            quantity,
                        }
                    }

                    setCart({
                        ...cart,
                        items: updatedItems,
                    })
                }
            }
        } catch (error) {
            console.error('Failed to update item quantity:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Remove item from cart
    const removeItem = async (productId: string) => {
        if (!cart) return

        setIsLoading(true)

        try {
            if (isAuthenticated) {
                const accessToken = cookieManager.current.get('accessToken')
                if (accessToken) {
                    const updatedCart = await removeCartItem(accessToken, productId)
                    setCart(updatedCart)
                }
            } else {
                // Remove from local cart
                const updatedItems = cart.items.filter((item) => item.productId !== productId)

                setCart({
                    ...cart,
                    items: updatedItems,
                })
            }
        } catch (error) {
            console.error('Failed to remove item from cart:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const clearCart = async () => {
        if (!cart) return

        setIsLoading(true)

        try {
            if (isAuthenticated) {
                const accessToken = cookieManager.current.get('accessToken')
                if (accessToken) {
                    setCart({
                        ...cart,
                        items: [],
                    })
                }
            } else {
                setCart({
                    ...cart,
                    items: [],
                })
                localStorage.removeItem('guestCart')
            }
        } catch (error) {
            console.error('Failed to clear cart:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const isInCart = (productId: string) => {
        return cart ? cart.items.some((item) => item.productId === productId) : false
    }

    const getItemQuantity = (productId: string) => {
        if (!cart) return 0
        const item = cart.items.find((item) => item.productId === productId)
        return item ? item.quantity : 0
    }

    return (
        <CartContext.Provider
            value={{
                cart,
                isLoading,
                addToCart,
                updateQuantity,
                removeItem,
                clearCart,
                isInCart,
                getItemQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context
}
