import type { Cart } from '@/types/cart'
import { API_URL } from '@/env'
import { $fetch } from '../fetch'

// Get cart
export async function getCart(accessToken: string): Promise<Cart> {
    try {
        const response = await $fetch(`/cart`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка при получении корзины')
        }

        return await response.json()
    } catch (error) {
        console.error('Get cart error:', error)
        throw error
    }
}

// Add item to cart
export async function addItemToCart(accessToken: string, productId: string, quantity: number): Promise<Cart> {
    try {
        const response = await $fetch(`/cart/items`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
        })

        if (!response.ok) {
            throw new Error('Ошибка при добавлении товара в корзину')
        }

        return await response.json()
    } catch (error) {
        console.error('Add to cart error:', error)
        throw error
    }
}

export async function updateCartItemQuantity(accessToken: string, productId: string, quantity: number): Promise<Cart> {
    try {
        const response = await $fetch(`/cart/items/${productId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        })
        console.log('DATA')

        if (!response.ok) {
            throw new Error('Ошибка при обновлении количества товара')
        }

        const data = await response.json()
        console.log(data)
        return data
    } catch (error) {
        console.error('Update cart item error:', error)
        throw error
    }
}

export async function removeCartItem(accessToken: string, productId: string): Promise<Cart> {
    try {
        const response = await $fetch(`/cart/items/${productId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка при удалении товара из корзины')
        }

        return await response.json()
    } catch (error) {
        console.error('Remove cart item error:', error)
        throw error
    }
}
