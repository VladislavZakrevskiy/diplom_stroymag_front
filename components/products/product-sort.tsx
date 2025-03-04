'use client'

import type React from 'react'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface ProductSortProps {
    currentSort: string
}

export default function ProductSort({ currentSort = 'popular' }: ProductSortProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSort = e.target.value

        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', newSort)

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-gray-600">
                Сортировка:
            </label>
            <select
                id="sort"
                value={currentSort}
                onChange={handleSortChange}
                className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
            >
                <option value="popular_asc">По популярности</option>
                <option value="price_asc">По возрастанию цены</option>
                <option value="price_desc">По убыванию цены</option>
                <option value="name_asc">По названию А-Я</option>
                <option value="name_desc">По названию Я-А</option>
                <option value="createdAt_desc">Сначала новые</option>
                <option value="createdAt_asc">Сначала старые</option>
            </select>
        </div>
    )
}
