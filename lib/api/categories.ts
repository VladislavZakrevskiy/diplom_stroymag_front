import { API_URL } from '@/env'
import { $fetch } from '../fetch'

export interface Category {
    id: string
    name: string
    _count: {
        products: number
    }
}

// Get all categories
export async function getCategories(): Promise<Category[]> {
    try {
        const response = await $fetch(`/categories`)

        if (!response.ok) {
            throw new Error('Ошибка при получении категорий')
        }

        return await response.json()
    } catch (error) {
        console.error('Get categories error:', error)
        return []
    }
}

// Get category by ID
export async function getCategoryById(id: string): Promise<Category | null> {
    try {
        const response = await $fetch(`/categories/${id}`)

        if (!response.ok) {
            if (response.status === 404) {
                return null
            }
            throw new Error('Ошибка при получении категории')
        }

        return await response.json()
    } catch (error) {
        console.error(`Get category ${id} error:`, error)
        return null
    }
}
