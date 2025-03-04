'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useAuth } from './auth-context'
import { getCart, addItemToCart, updateCartItemQuantity, removeCartItem } from '@/lib/api/cart'
import type { Cart, CartItem } from '@/types/cart'
import type { Product } from '@/types/product'

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
    const { isAuthenticated, getAccessToken } = useAuth()
    const [cart, setCart] = useState<Cart | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Initialize cart
    useEffect(() => {
        const initCart = async () => {
            setIsLoading(true)

            try {
                // Try to get cart from localStorage for guest users
                if (!isAuthenticated) {
                    const storedCart = localStorage.getItem('guestCart')
                    if (storedCart) {
                        setCart(JSON.parse(storedCart))
                    } else {
                        // Initialize empty cart for guests
                        setCart({
                            id: 'guest',
                            items: [],
                            subtotal: 0,
                            total: 0,
                            discount: 0,
                        })
                    }
                } else {
                    // Fetch cart from API for authenticated users
                    const accessToken = await getAccessToken()
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
    }, [isAuthenticated, getAccessToken])

    // Save guest cart to localStorage
    useEffect(() => {
        if (!isAuthenticated && cart && cart.id === 'guest') {
            localStorage.setItem('guestCart', JSON.stringify(cart))
        }
    }, [cart, isAuthenticated])

    // Helper function to calculate cart totals
    const calculateCartTotals = (items: CartItem[]) => {
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        // In a real app, you might apply discounts, shipping, etc.
        return {
            subtotal,
            total: subtotal,
            discount: 0,
        }
    }

    // Add item to cart
    const addToCart = async (product: Product, quantity = 1) => {
        if (!cart) return

        setIsLoading(true)

        try {
            if (isAuthenticated) {
                // Add to server cart
                const accessToken = await getAccessToken()
                if (accessToken) {
                    const updatedCart = await addItemToCart(accessToken, product.id, quantity)
                    setCart(updatedCart)
                }
            } else {
                // Add to local cart
                const existingItemIndex = cart.items.findIndex((item) => item.productId === product.id)

                let updatedItems
                if (existingItemIndex >= 0) {
                    // Update quantity if item exists
                    updatedItems = [...cart.items]
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: updatedItems[existingItemIndex].quantity + quantity,
                    }
                } else {
                    // Add new item
                    updatedItems = [
                        ...cart.items,
                        {
                            id: `guest-${Date.now()}`,
                            productId: product.id,
                            name: product.name,
                            price: product.price,
                            quantity,
                            imageUrl: product.images?.[0],
                        },
                    ]
                }

                const { subtotal, total, discount } = calculateCartTotals(updatedItems)

                setCart({
                    ...cart,
                    items: updatedItems,
                    subtotal,
                    total,
                    discount,
                })
            }
        } catch (error) {
            console.error('Failed to add item to cart:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Update item quantity
    const updateQuantity = async (productId: string, quantity: number) => {
        if (!cart) return

        setIsLoading(true)

        try {
            if (isAuthenticated) {
                // Update on server
                const accessToken = await getAccessToken()
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

                    const { subtotal, total, discount } = calculateCartTotals(updatedItems)

                    setCart({
                        ...cart,
                        items: updatedItems,
                        subtotal,
                        total,
                        discount,
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
                // Remove from server
                const accessToken = await getAccessToken()
                if (accessToken) {
                    const updatedCart = await removeCartItem(accessToken, productId)
                    setCart(updatedCart)
                }
            } else {
                // Remove from local cart
                const updatedItems = cart.items.filter((item) => item.productId !== productId)
                const { subtotal, total, discount } = calculateCartTotals(updatedItems)

                setCart({
                    ...cart,
                    items: updatedItems,
                    subtotal,
                    total,
                    discount,
                })
            }
        } catch (error) {
            console.error('Failed to remove item from cart:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Clear cart
    const clearCart = async () => {
        if (!cart) return

        setIsLoading(true)

        try {
            if (isAuthenticated) {
                // Clear server cart (assuming API endpoint exists)
                const accessToken = await getAccessToken()
                if (accessToken) {
                    // This would be a call to a clearCart API endpoint
                    // For now, we'll just set an empty cart
                    setCart({
                        ...cart,
                        items: [],
                        subtotal: 0,
                        total: 0,
                        discount: 0,
                    })
                }
            } else {
                // Clear local cart
                setCart({
                    ...cart,
                    items: [],
                    subtotal: 0,
                    total: 0,
                    discount: 0,
                })
                localStorage.removeItem('guestCart')
            }
        } catch (error) {
            console.error('Failed to clear cart:', error)
        } finally {
            setIsLoading(false)
        }
    }

    // Check if product is in cart
    const isInCart = (productId: string) => {
        return cart ? cart.items.some((item) => item.productId === productId) : false
    }

    // Get quantity of item in cart
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
