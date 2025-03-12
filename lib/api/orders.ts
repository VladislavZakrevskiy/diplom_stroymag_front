import type { Order } from '@/types/order'
import { $fetch } from '../fetch'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com'

export async function getUserOrders(accessToken: string): Promise<Order[]> {
    try {
        const response = await $fetch(`/orders`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка при получении заказов')
        }

        return await response.json()
    } catch (error) {
        console.error('Get user orders error:', error)
        return []
    }
}

// Get order by ID
export async function getOrderById(accessToken: string, orderId: string): Promise<Order | null> {
    try {
        const response = await $fetch(`/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            if (response.status === 404) {
                return null
            }
            throw new Error('Ошибка при получении заказа')
        }

        const data = await response.json()
        console.log(data)

        return data
    } catch (error) {
        console.error(`Get order ${orderId} error:`, error)
        return null
    }
}

// Create new order
export async function createOrder(
    accessToken: string,
    orderData: {
        addressId: string
        deliveryMethod: string
        paymentMethod: string
        comment?: string
    }
): Promise<Order> {
    try {
        const response = await $fetch(`/checkout`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })

        if (!response.ok) {
            throw new Error('Ошибка при создании заказа')
        }

        return await response.json()
    } catch (error) {
        console.error('Create order error:', error)
        throw error
    }
}

// Cancel order
export async function cancelOrder(accessToken: string, orderId: string): Promise<Order> {
    try {
        const response = await $fetch(`/orders/${orderId}/cancel`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка при отмене заказа')
        }

        return await response.json()
    } catch (error) {
        console.error(`Cancel order ${orderId} error:`, error)
        throw error
    }
}
