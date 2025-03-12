import { API_URL } from '@/env'
import type { Product } from '@/types/product'
import { $fetch } from '../fetch'

interface GetProductsParams {
    page?: number
    limit?: number
    search?: string
    category?: string
    sort?: string
    minPrice?: number
    maxPrice?: number
    isSale?: boolean
}

interface ProductsResponse {
    data: Product[]
    meta: { total: number; page: number; limit: number }
}

export async function getProducts(params: GetProductsParams = {}): Promise<ProductsResponse> {
    const { page = 1, limit = 12, search = '', category = '', sort = 'price_asc', minPrice, maxPrice, isSale = false } = params

    try {
        const queryParams = new URLSearchParams()
        queryParams.append('page', page.toString())
        queryParams.append('limit', limit.toString())

        if (search) queryParams.append('search', search)
        if (category) queryParams.append('category', category)
        if (sort) queryParams.append('sort', sort)
        if (minPrice !== undefined) queryParams.append('minPrice', minPrice.toString())
        if (maxPrice !== undefined) queryParams.append('maxPrice', maxPrice.toString())
        if (isSale) queryParams.append('isSale', 'true')

        const response = await fetch(
            `${API_URL}/products${Object.keys(params).length > 0 ? `?${queryParams.toString()}` : ''}`,
            { cache: 'no-cache' }
        )

        if (response.status !== 200) {
            throw new Error('Ошибка при получении товаров')
        }

        const data = await response.json()

        return data
    } catch (error) {
        console.error('Get products error:', error)
        return {
            data: [],
            meta: { total: 0, page, limit },
        }
    }
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
    try {
        const response = await $fetch(`/products/${id}`)

        if (!response.ok) {
            if (response.status === 404) {
                return null
            }
            throw new Error('Ошибка при получении товара')
        }

        return await response.json()
    } catch (error) {
        console.error(`Get product ${id} error:`, error)
        return null
    }
}

export async function getFeaturedProducts(): Promise<Product[]> {
    try {
        const response = await $fetch(`/products/featured`)

        if (!response.ok) {
            throw new Error('Ошибка при получении популярных товаров')
        }

        return await response.json()
    } catch (error) {
        console.error('Get featured products error:', error)
        return []
    }
}

// Get related products
export async function getRelatedProducts(productId: string): Promise<Product[]> {
    try {
        const response = await $fetch(`/products/${productId}/related`)

        if (!response.ok) {
            throw new Error('Ошибка при получении похожих товаров')
        }

        return await response.json()
    } catch (error) {
        console.error('Get related products error:', error)
        return []
    }
}
