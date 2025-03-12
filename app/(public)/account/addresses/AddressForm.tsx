'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { createAddress, updateAddress } from '@/lib/api/addresses'
import type { Address } from '@/lib/api/addresses'

interface AddressFormProps {
    address?: Address
}

export default function AddressForm({ address }: AddressFormProps) {
    const router = useRouter()
    const { getAccessToken } = useAuth()

    const [formData, setFormData] = useState({
        title: address?.title || '',
        city: address?.city || '',
        street: address?.street || '',
        house: address?.house || '',
        apartment: address?.apartment || '',
        zipCode: address?.zipCode || '',
        isDefault: address?.isDefault || false,
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        try {
            const accessToken = await getAccessToken()

            if (!accessToken) {
                throw new Error('Необходимо авторизоваться')
            }

            if (address) {
                // Update existing address
                await updateAddress(accessToken, address.id, {
                    title: formData.title,
                    city: formData.city,
                    street: formData.street,
                    house: formData.house,
                    apartment: formData.apartment || undefined,
                    zipCode: formData.zipCode,
                    isDefault: formData.isDefault,
                })
            } else {
                // Create new address
                await createAddress(accessToken, {
                    title: formData.title,
                    city: formData.city,
                    street: formData.street,
                    house: formData.house,
                    apartment: formData.apartment || undefined,
                    zipCode: formData.zipCode,
                    isDefault: formData.isDefault,
                })
            }

            // Redirect back to addresses page
            router.push('/account/addresses')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Ошибка при сохранении адреса')
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>}

            <div>
                <label htmlFor="title" className="mb-1 block font-medium">
                    Название адреса
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    className="input"
                    placeholder="Например: Дом, Работа, Дача"
                    required
                />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="city" className="mb-1 block font-medium">
                        Город
                    </label>
                    <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="zipCode" className="mb-1 block font-medium">
                        Почтовый индекс
                    </label>
                    <input
                        id="zipCode"
                        name="zipCode"
                        type="text"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>
            </div>

            <div>
                <label htmlFor="street" className="mb-1 block font-medium">
                    Улица
                </label>
                <input
                    id="street"
                    name="street"
                    type="text"
                    value={formData.street}
                    onChange={handleChange}
                    className="input"
                    required
                />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label htmlFor="house" className="mb-1 block font-medium">
                        Дом
                    </label>
                    <input
                        id="house"
                        name="house"
                        type="text"
                        value={formData.house}
                        onChange={handleChange}
                        className="input"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="apartment" className="mb-1 block font-medium">
                        Квартира/офис
                    </label>
                    <input
                        id="apartment"
                        name="apartment"
                        type="text"
                        value={formData.apartment}
                        onChange={handleChange}
                        className="input"
                    />
                </div>
            </div>

            <div className="flex items-center">
                <input
                    id="isDefault"
                    name="isDefault"
                    type="checkbox"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
                />
                <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                    Использовать как адрес по умолчанию
                </label>
            </div>

            <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => router.push('/account/addresses')} className="btn-outline">
                    Отмена
                </button>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Сохранение...' : address ? 'Сохранить изменения' : 'Добавить адрес'}
                </button>
            </div>
        </form>
    )
}
