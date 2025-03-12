'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCategories } from '@/lib/api/categories'

interface AdminProductsFilterProps {
    selectedCategory: string
    inStock?: boolean
}

export default function AdminProductsFilter({ selectedCategory, inStock }: AdminProductsFilterProps) {
    const router = useRouter()
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
    const [filters, setFilters] = useState({
        category: selectedCategory,
        inStock: inStock,
    })

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories()
                setCategories(categoriesData)
            } catch (error) {
                console.error('Failed to fetch categories:', error)
            }
        }

        fetchCategories()
    }, [])

    const handleFilterChange = (name: string, value?: string | boolean) => {
        setFilters((prev) => ({ ...prev, [name]: value }))
    }

    const applyFilters = () => {
        const params = new URLSearchParams()

        if (filters.category) {
            params.set('category', filters.category)
        }

        if (filters.inStock !== undefined) {
            params.set('inStock', String(filters.inStock))
        }

        router.push(`/admin/products?${params.toString()}`)
    }

    const resetFilters = () => {
        setFilters({
            category: '',
            inStock: undefined,
        })

        router.push('/admin/products')
    }

    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">Фильтры</h2>

            <div className="space-y-6">
                <div>
                    <label htmlFor="category" className="mb-2 block font-medium">
                        Категория
                    </label>
                    <select
                        id="category"
                        className="input"
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                        <option value="">Все категории</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block font-medium">Наличие</label>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="inStock"
                                checked={filters.inStock === undefined}
                                onChange={() => handleFilterChange('inStock', undefined)}
                                className="mr-2 h-4 w-4"
                            />
                            <span>Все</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="inStock"
                                checked={filters.inStock === true}
                                onChange={() => handleFilterChange('inStock', true)}
                                className="mr-2 h-4 w-4"
                            />
                            <span>В наличии</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="inStock"
                                checked={filters.inStock === false}
                                onChange={() => handleFilterChange('inStock', false)}
                                className="mr-2 h-4 w-4"
                            />
                            <span>Нет в наличии</span>
                        </label>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={applyFilters}
                        className="flex-1 rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
                    >
                        Применить
                    </button>
                    <button
                        onClick={resetFilters}
                        className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                        Сбросить
                    </button>
                </div>
            </div>
        </div>
    )
}
