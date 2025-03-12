'use client'

import Link from 'next/link'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { createOrder } from '@/lib/api/orders'
import { useAuth } from '@/context/auth-context'
import type { User } from '@/types/auth'
import type { Address } from '@/lib/api/addresses'
import { MapPin, Truck, CreditCard } from 'lucide-react'

interface CheckoutFormProps {
    addresses: Address[]
    setDeliveryCost: React.Dispatch<React.SetStateAction<number>>
}

export default function CheckoutForm({ addresses, setDeliveryCost }: CheckoutFormProps) {
    const router = useRouter()
    const { cart, clearCart } = useCart()
    const { getAccessToken } = useAuth()

    const [formData, setFormData] = useState({
        addressId: addresses.find((a) => a.isDefault)?.id || '',
        deliveryMethod: 'standard',
        paymentMethod: 'card',
        comment: '',
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        if (name === 'deliveryMethod') {
            switch (value) {
                case 'standard':
                    setDeliveryCost(500)
                    break
                case 'express':
                    setDeliveryCost(1000)
                    break
                case 'cargo':
                    setDeliveryCost(1500)
                    break
                case 'pickup':
                    setDeliveryCost(0)
                    break
            }
        }
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!cart || cart.items.length === 0) {
            setError('Ваша корзина пуста')
            return
        }

        if (!formData.addressId) {
            setError('Выберите адрес доставки')
            return
        }

        setIsLoading(true)
        setError('')

        try {
            const accessToken = await getAccessToken()

            if (!accessToken) {
                throw new Error('Необходимо авторизоваться')
            }

            // Create order
            const order = await createOrder(accessToken, {
                addressId: formData.addressId,
                deliveryMethod: formData.deliveryMethod,
                paymentMethod: formData.paymentMethod,
                comment: formData.comment || undefined,
            })

            // Redirect to payment page if payment method is card
            if (formData.paymentMethod === 'card') {
                router.push(`/checkout/payment/${order.id}`)
            } else {
                // For cash payment, redirect to success page
                await clearCart()
                router.push(`/checkout/success/${order.id}`)
            }
        } catch (err: any) {
            setError(err.message || 'Ошибка при оформлении заказа')
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {error && <div className="rounded-md bg-red-50 p-4 text-red-700">{error}</div>}

            <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-gray-800" />
                    <h2 className="text-xl font-bold">Адрес доставки</h2>
                </div>

                {addresses.length > 0 ? (
                    <div className="space-y-4">
                        {addresses.map((address) => (
                            <label
                                key={address.id}
                                className={`flex cursor-pointer items-start rounded-lg border p-4 transition-colors ${
                                    formData.addressId === address.id
                                        ? 'border-gray-800 bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="addressId"
                                    value={address.id}
                                    checked={formData.addressId === address.id}
                                    onChange={handleChange}
                                    className="mt-1 h-4 w-4 border-gray-300 text-gray-800 focus:ring-gray-800"
                                />
                                <div className="ml-3">
                                    <div className="font-medium">{address.title}</div>
                                    <div className="text-gray-600">
                                        {address.zipCode}, {address.city}, {address.street}, {address.house}
                                        {address.apartment && `, кв. ${address.apartment}`}
                                    </div>
                                </div>
                                {address.isDefault && (
                                    <span className="ml-auto rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                                        По умолчанию
                                    </span>
                                )}
                            </label>
                        ))}

                        <div className="mt-4 text-center">
                            <Link href="/account/addresses/new" className="text-gray-800 hover:underline">
                                + Добавить новый адрес
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="rounded-lg border border-dashed p-6 text-center">
                        <p className="mb-4 text-gray-600">У вас пока нет сохраненных адресов</p>
                        <Link href="/account/addresses/new" className="btn-primary">
                            Добавить адрес
                        </Link>
                    </div>
                )}
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center">
                    <Truck className="mr-2 h-5 w-5 text-gray-800" />
                    <h2 className="text-xl font-bold">Способ доставки</h2>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            id: 'standard',
                            title: 'Стандартная доставка',
                            description: 'Доставка в течение 1-2 рабочих дней',
                            price: '500 ₽',
                        },
                        {
                            id: 'express',
                            title: 'Экспресс-доставка',
                            description: 'Доставка в день заказа или на следующий день',
                            price: '1000 ₽',
                        },
                        {
                            id: 'cargo',
                            title: 'Грузовая доставка',
                            description: 'Доставка в день заказа или на следующий день с помощью техники',
                            price: '1500 ₽',
                        },
                        {
                            id: 'pickup',
                            title: 'Самовывоз',
                            description: 'Самовывоз из магазина',
                            price: 'Бесплатно',
                        },
                    ].map((method) => (
                        <label
                            key={method.id}
                            className={`flex cursor-pointer items-start rounded-lg border p-4 transition-colors ${
                                formData.deliveryMethod === method.id
                                    ? 'border-gray-800 bg-gray-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <input
                                type="radio"
                                name="deliveryMethod"
                                value={method.id}
                                checked={formData.deliveryMethod === method.id}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4 border-gray-300 text-gray-800 focus:ring-gray-800"
                            />
                            <div className="ml-3 flex-grow">
                                <div className="font-medium">{method.title}</div>
                                <div className="text-gray-600">{method.description}</div>
                            </div>
                            <div className="ml-4 font-medium">{method.price}</div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center">
                    <CreditCard className="mr-2 h-5 w-5 text-gray-800" />
                    <h2 className="text-xl font-bold">Способ оплаты</h2>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            id: 'card',
                            title: 'Банковская карта',
                            description: 'Оплата картой онлайн',
                            icon: '💳',
                        },
                        {
                            id: 'cash',
                            title: 'Наличными при получении',
                            description: 'Оплата курьеру при доставке',
                            icon: '💵',
                        },
                    ].map((method) => (
                        <label
                            key={method.id}
                            className={`flex cursor-pointer items-start rounded-lg border p-4 transition-colors ${
                                formData.paymentMethod === method.id
                                    ? 'border-gray-800 bg-gray-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                value={method.id}
                                checked={formData.paymentMethod === method.id}
                                onChange={handleChange}
                                className="mt-1 h-4 w-4 border-gray-300 text-gray-800 focus:ring-gray-800"
                            />
                            <div className="ml-3">
                                <div className="flex items-center">
                                    <span className="mr-2">{method.icon}</span>
                                    <span className="font-medium">{method.title}</span>
                                </div>
                                <div className="text-gray-600">{method.description}</div>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold">Комментарий к заказу</h2>
                <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    rows={3}
                    className="input"
                    placeholder="Дополнительная информация для курьера или магазина"
                ></textarea>
            </div>

            <div className="flex justify-between">
                <Link href="/cart" className="btn-outline">
                    Вернуться в корзину
                </Link>
                <button type="submit" className="btn-primary" disabled={isLoading}>
                    {isLoading ? 'Оформление...' : 'Оформить заказ'}
                </button>
            </div>
        </form>
    )
}
