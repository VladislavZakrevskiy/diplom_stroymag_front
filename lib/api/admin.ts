import type { Product } from '@/types/product'
import type { Order } from '@/types/order'
import type { User } from '@/types/auth'
import type { Address } from '@/lib/api/addresses'
import { $fetch } from '../fetch'
import { Category } from './categories'
import { API_URL } from '@/types/env'

export async function getAdminStats(accessToken: string): Promise<{
    totalUsers: number
    totalProducts: number
    totalOrders: number
    totalRevenue: number
    recentOrders: Order[]
    lowStockProducts: number
}> {
    try {
        const response = await $fetch(`/admin/stats`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        console.log(response)

        if (!response.ok) {
            throw new Error('Ошибка при получении статистики')
        }

        return await response.json()
    } catch (error) {
        console.error('Get admin stats error:', error)
        throw error
    }
}

interface GetAdminProductsParams {
    page?: number
    search?: string
    category?: string
    inStock?: boolean
}

interface AdminProductsResponse {
    data: Product[]
    meta: { total: number; totalPages: number; limit: number; page: number }
}

export async function getAdminProducts(
    accessToken: string,
    params: GetAdminProductsParams
): Promise<AdminProductsResponse> {
    const { page = 1, search = '', category = '', inStock } = params

    try {
        const queryParams = new URLSearchParams()
        queryParams.append('page', page.toString())
        if (search) queryParams.append('search', search)
        if (category) queryParams.append('category', category)
        if (inStock !== undefined) queryParams.append('inStock', String(inStock))

        const response = await $fetch(`/admin/products?${queryParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error('Ошибка при получении товаров')
        }

        return data
    } catch (error) {
        console.error('Get admin products error:', error)
        throw error
    }
}

// Create product
export async function createProduct(accessToken: string, productData: any): Promise<Product> {
    try {
        const response = await $fetch(`/admin/products`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })

        if (!response.ok) {
            throw new Error('Ошибка при создании товара')
        }

        return await response.json()
    } catch (error) {
        console.error('Create product error:', error)
        throw error
    }
}

// Update product
export async function updateProduct(accessToken: string, productId: string, productData: any): Promise<Product> {
    try {
        const response = await $fetch(`/admin/products/${productId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })

        if (!response.ok) {
            throw new Error('Ошибка при обновлении товара')
        }

        return await response.json()
    } catch (error) {
        console.error('Update product error:', error)
        throw error
    }
}

// Get admin categories
export async function getAdminCategories(accessToken: string): Promise<Category[]> {
    try {
        const response = await $fetch(`/admin/categories`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error('Ошибка при получении категорий')
        }

        return data
    } catch (error) {
        console.error('Get admin categories error:', error)
        throw error
    }
}

// Create category
export async function createCategory(accessToken: string, categoryData: any): Promise<any> {
    try {
        const response = await $fetch(`/admin/categories`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
        })

        if (!response.ok) {
            throw new Error('Ошибка при создании категории')
        }

        return await response.json()
    } catch (error) {
        console.error('Create category error:', error)
        throw error
    }
}

// Update category
export async function updateCategory(accessToken: string, categoryId: string, categoryData: any): Promise<any> {
    try {
        const response = await $fetch(`/admin/categories/${categoryId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(categoryData),
        })

        if (!response.ok) {
            throw new Error('Ошибка при обновлении категории')
        }

        return await response.json()
    } catch (error) {
        console.error('Update category error:', error)
        throw error
    }
}

interface GetAdminOrdersParams {
    page?: number
    status?: string
}

interface AdminOrdersResponse {
    orders: Order[]
    total: number
    totalPages: number
}

// Get admin orders
export async function getAdminOrders(accessToken: string, params: GetAdminOrdersParams): Promise<AdminOrdersResponse> {
    const { page = 1, status = '' } = params

    try {
        const queryParams = new URLSearchParams()
        queryParams.append('page', page.toString())
        if (status) queryParams.append('status', status)

        const response = await $fetch(`/admin/orders?${queryParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка при получении заказов')
        }

        return await response.json()
    } catch (error) {
        console.error('Get admin orders error:', error)
        throw error
    }
}

// Update order status
export async function updateOrderStatus(accessToken: string, orderId: string, status: string): Promise<Order> {
    try {
        const response = await $fetch(`/admin/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        })

        if (!response.ok) {
            throw new Error('Ошибка при обновлении статуса заказа')
        }

        return await response.json()
    } catch (error) {
        console.error('Update order status error:', error)
        throw error
    }
}

interface GetAdminUsersParams {
    page?: number
    search?: string
}

interface AdminUsersResponse {
    data: (User & { ordersCount: number; isActive: boolean; addresses: Address[] })[]
    meta: { total: number; totalPages: number; limit: number; page: number }
}

// Get admin users
export async function getAdminUsers(accessToken: string, params: GetAdminUsersParams): Promise<AdminUsersResponse> {
    const { page = 1, search = '' } = params

    try {
        const queryParams = new URLSearchParams()
        queryParams.append('page', page.toString())
        if (search) queryParams.append('search', search)

        const response = await $fetch(`/admin/users?${queryParams.toString()}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error('Ошибка при получении пользователей')
        }

        return data
    } catch (error) {
        console.error('Get admin users error:', error)
        throw error
    }
}

// Get user by ID
export async function getUserById(
    accessToken: string,
    userId: string
): Promise<User & { ordersCount: number; isActive: boolean; addresses: Address[] }> {
    try {
        const response = await $fetch(`/admin/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error('Ошибка при получении пользователя')
        }

        return await response.json()
    } catch (error) {
        console.error('Get user by ID error:', error)
        throw error
    }
}

// Update user status
export async function updateUserStatus(accessToken: string, userId: string, isActive: boolean): Promise<User> {
    try {
        const response = await $fetch(`/admin/users/${userId}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isActive }),
        })

        if (!response.ok) {
            throw new Error('Ошибка при обновлении статуса пользователя')
        }

        return await response.json()
    } catch (error) {
        console.error('Update user status error:', error)
        throw error
    }
}
