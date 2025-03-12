'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '@/context/auth-context'
import { createProduct, updateProduct } from '@/lib/api/admin'
import { Plus, X, Upload } from 'lucide-react'
import type { Product } from '@/types/product'

interface ProductFormProps {
    product?: Product
    categories: { id: string; name: string }[]
}

export default function ProductForm({ product, categories }: ProductFormProps) {
    const router = useRouter()
    const { getAccessToken } = useAuth()

    const [formData, setFormData] = useState({
        name: product?.name || '',
        sku: product?.id || '',
        price: product?.price || 0,
        categoryId: product?.categoryId || '',
        description: product?.description || '',
        stock: product?.stock ?? 0,
        image: product?.images[0] || '',
    })

    const [newCharacteristic, setNewCharacteristic] = useState({ name: '', value: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement

        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked,
            }))
        } else if (type === 'number') {
            setFormData((prev) => ({
                ...prev,
                [name]: Number.parseFloat(value) || 0,
            }))
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            const accessToken = await getAccessToken()

            if (!accessToken) {
                throw new Error('Необходимо авторизоваться')
            }

            if (product) {
                // Update existing product
                await updateProduct(accessToken, product.id, formData)
            } else {
                // Create new product
                await createProduct(accessToken, formData)
            }

            router.push('/admin/products')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Ошибка при сохранении товара')
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {error && <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-6 text-xl font-bold">Основная информация</h2>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="mb-1 block font-medium">
                                    Название товара *
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="categoryId" className="mb-1 block font-medium">
                                        Категория *
                                    </label>
                                    <select
                                        id="categoryId"
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    >
                                        <option value="">Выберите категорию</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div>
                                    <label htmlFor="price" className="mb-1 block font-medium">
                                        Цена *
                                    </label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="price" className="mb-1 block font-medium">
                                    Количество
                                </label>
                                <input
                                    id="stock"
                                    name="stock"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="mb-1 block font-medium">
                                    Полное описание *
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={6}
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-6 text-xl font-bold">Изображение товара</h2>

                        <div className="space-y-4">
                            <div className="flex flex-col items-center">
                                <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg border">
                                    {formData.image ? (
                                        <Image
                                            src={formData.image || '/placeholder.svg'}
                                            alt="Product image"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gray-100">
                                            <Upload className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="image" className="mb-1 block font-medium">
                                        URL изображения
                                    </label>
                                    <input
                                        id="image"
                                        name="image"
                                        type="text"
                                        value={formData.image}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={() => router.push('/admin/products')}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Сохранение...' : product ? 'Сохранить изменения' : 'Создать товар'}
                </button>
            </div>
        </form>
    )
}
