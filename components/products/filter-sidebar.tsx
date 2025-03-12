'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Category, getCategories } from '@/lib/api/categories'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FilterSidebarProps {
    category?: string
    minPrice?: number
    maxPrice?: number
    isSale?: boolean
    categories: Category[]
}

export default function FilterSidebar({
    category: initialCategory = '',
    minPrice: initialMinPrice,
    maxPrice: initialMaxPrice,
    isSale: initialIsSale,
    categories,
}: FilterSidebarProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [selectedCategory, setSelectedCategory] = useState(initialCategory)
    const [priceRange, setPriceRange] = useState({
        min: initialMinPrice || 0,
        max: initialMaxPrice || 100000,
    })
    const [isSale, setIsSale] = useState(initialIsSale)
    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        price: true,
    })

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }))
    }

    const handleCategoryChange = (categoryId: string) => {
        const newCategory = categoryId === selectedCategory ? '' : categoryId
        setSelectedCategory(newCategory)
        updateFilters({ category: newCategory })
    }

    const handlePriceChange = (type: 'min' | 'max', value: string) => {
        const numValue = value === '' ? (type === 'min' ? 0 : 100000) : Number.parseInt(value)
        setPriceRange((prev) => ({ ...prev, [type]: numValue }))
    }

    const handleIsSale = () => {
        setIsSale((prev) => !prev)
        if (!isSale) {
            updateFilters({ isSale: !isSale })
        } else {
            updateFilters({ isSale: undefined })
        }
    }

    const applyPriceFilter = () => {
        updateFilters({
            minPrice: priceRange.min > 0 ? priceRange.min : undefined,
            maxPrice: priceRange.max < 100000 ? priceRange.max : undefined,
        })
    }

    const updateFilters = (newFilters: Record<string, any>) => {
        const params = new URLSearchParams(searchParams.toString())

        // Update or remove params based on new filters
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value === undefined || value === '') {
                params.delete(key)
            } else {
                params.set(key, String(value))
            }
        })

        params.set('page', '1')

        router.push(`${pathname}?${params.toString()}`)
    }

    const resetFilters = () => {
        setSelectedCategory('')
        setPriceRange({ min: 0, max: 100000 })
        router.push(pathname)
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div>
                <button
                    onClick={() => toggleSection('categories')}
                    className="flex items-center justify-between w-full font-bold mb-2"
                >
                    <span>Категории</span>
                    {expandedSections.categories ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {expandedSections.categories && (
                    <div className="space-y-2">
                        {categories.map((cat) => (
                            <label key={cat.id} className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={selectedCategory === cat.id}
                                    onChange={() => handleCategoryChange(cat.id)}
                                    className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
                                />
                                <span className="ml-2 text-gray-700">{cat.name}</span>
                                <span className="ml-auto text-gray-500 text-sm">{cat._count.products}</span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <div className="border-t pt-6">
                <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isSale === true}
                        onChange={handleIsSale}
                        className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
                    />
                    <span className="ml-2 text-gray-700">По акции</span>
                </label>
            </div>

            <div className="border-t pt-6">
                <button
                    onClick={() => toggleSection('price')}
                    className="flex items-center justify-between w-full font-bold mb-2"
                >
                    <span>Цена</span>
                    {expandedSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {expandedSections.price && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="min-price" className="block text-sm mb-1">
                                    От
                                </label>
                                <input
                                    id="min-price"
                                    type="number"
                                    min="0"
                                    value={priceRange.min}
                                    onChange={(e) => handlePriceChange('min', e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div>
                                <label htmlFor="max-price" className="block text-sm mb-1">
                                    До
                                </label>
                                <input
                                    id="max-price"
                                    type="number"
                                    min="0"
                                    value={priceRange.max}
                                    onChange={(e) => handlePriceChange('max', e.target.value)}
                                    className="input"
                                />
                            </div>
                        </div>

                        <button onClick={applyPriceFilter} className="btn-primary w-full">
                            Применить
                        </button>
                    </div>
                )}
            </div>

            <div className="border-t pt-6">
                <button onClick={resetFilters} className="btn-outline w-full">
                    Сбросить фильтры
                </button>
            </div>
        </div>
    )
}
