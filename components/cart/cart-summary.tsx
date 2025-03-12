import { formatPrice } from '@/lib/utils'
import type { Cart } from '@/types/cart'

interface CartSummaryProps {
    cart: Cart
}

export default function CartSummary({ cart }: CartSummaryProps) {
    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-bold">Сумма заказа</h2>

            <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between">
                    <span className="text-gray-600">Товары ({cart.items.reduce((a, b) => (a += b.quantity), 0)})</span>
                    <span>{formatPrice(cart.items.reduce((a, b) => (a += b.product.price * b.quantity), 0))}</span>
                </div>
            </div>

            <div className="mt-4 flex justify-between font-bold">
                <span>Итого</span>
                <span>{formatPrice(cart.items.reduce((a, b) => (a += b.product.price * b.quantity), 0))}</span>
            </div>
        </div>
    )
}
