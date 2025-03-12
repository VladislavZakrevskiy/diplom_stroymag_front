'use client'

import { useCart } from '@/context/cart-context'
import { formatPrice } from '@/lib/utils'

interface OrderSummaryClientProps {
    deliveryCost: number
}

export default function OrderSummaryClient({ deliveryCost }: OrderSummaryClientProps) {
    const { cart } = useCart()

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

    const total = cart.items.reduce((a, b) => (a += b.product.price), 0) + deliveryCost

    return (
        <div className="space-y-4">
            <div className="max-h-60 overflow-y-auto">
                {cart.items.map((item) => (
                    <div key={item.id} className="mb-3 flex items-center border-b pb-3">
                        <div className="flex-grow">
                            <div className="font-medium">{item.product.name}</div>
                            <div className="text-sm text-gray-600">
                                {formatPrice(item.product.price)} × {item.quantity}
                            </div>
                        </div>
                        <div className="font-medium">{formatPrice(item.product.price * item.quantity)}</div>
                    </div>
                ))}
            </div>

            <div className="space-y-2 border-b pb-4 pt-2">
                <div className="flex justify-between">
                    <span className="text-gray-600">Товары ({cart.items.length})</span>
                    <span>{formatPrice(cart.items.reduce((a, b) => (a += b.product.price), 0))}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">Доставка</span>
                    <span>{formatPrice(deliveryCost)}</span>
                </div>
            </div>

            <div className="flex justify-between font-bold">
                <span>Итого</span>
                <span>{formatPrice(total)}</span>
            </div>
        </div>
    )
}
