'use client'

import { useState } from 'react'
import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'

export default function OrderSummary() {
    const { cart } = useCart()
    const [deliveryCost, setDeliveryCost] = useState(500)

    if (!cart) {
        return (
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-gray-800 border-t-transparent"></div>
                <p className="mt-2 text-sm text-gray-600">Загрузка данных заказа...</p>
            </div>
        )
    }

    if (cart.items.length === 0) {
        return (
            <div className="text-center">
                <p className="text-gray-600">Ваша корзина пуста</p>
            </div>
        )
    }

    const total = cart.subtotal + deliveryCost - cart.discount

    return (
        <div className="space-y-4">
            <div className="max-h-60 overflow-y-auto">
                {cart.items.map((item) => (
                    <div key={item.id} className="mb-3 flex items-center border-b pb-3">
                        <div className="flex-grow">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-gray-600">
                                {formatPrice(item.price)} × {item.quantity}
                            </div>
                        </div>
                        <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                    </div>
                ))}
            </div>

            <div className="space-y-2 border-b pb-4 pt-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Товары ({cart.items.length})</span>
                    <span>{formatPrice(cart.subtotal)}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Доставка</span>
                    <span>{formatPrice(deliveryCost)}</span>
                </div>

                {cart.discount > 0 && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Скидка</span>
                        <span className="text-red-600">-{formatPrice(cart.discount)}</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between font-bold">
                <span>Итого</span>
                <span>{formatPrice(total)}</span>
            </div>
        </div>
    )
}
