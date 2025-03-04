import { API_URL } from '@/env'
import { $fetch } from '../fetch'

interface Order {
  id: string
  number: string
  createdAt: string
  total: number
  itemsCount: number
  status: string
}

// Get user orders
export async function getUserOrders(accessToken: string): Promise<Order[]> {
  try {
    const response = await $fetch(`/orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error("Ошибка при получении заказов")
    }

    return await response.json()
  } catch (error) {
    console.error("Get user orders error:", error)
    return []
  }
}

