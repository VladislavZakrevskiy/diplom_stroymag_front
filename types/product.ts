import { Category } from '@/lib/api/categories'

export interface ProductCharacteristic {
    id: string
    name: string
    value: string
}

export interface ProductReview {
    id: string
    author: string
    rating: number
    text: string
    date: string
}

export interface Product {
    id: string
    name: string
    description: string
    price: number
    discount: number
    stock: number
    images: string[]
    featured: boolean
    categoryId: string
    createdAt: string
    updatedAt: string
    category: Category
}
