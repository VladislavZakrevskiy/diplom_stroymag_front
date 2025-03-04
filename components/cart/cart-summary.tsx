import { formatPrice } from "@/lib/utils"
import type { Cart } from "@/types/cart"

interface CartSummaryProps {
  cart: Cart
}

export default function CartSummary({ cart }: CartSummaryProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-lg font-bold">Сумма заказа</h2>

      <div className="space-y-2 border-b pb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Товары ({cart.items.length})</span>
          <span>{formatPrice(cart.subtotal)}</span>
        </div>

        {cart.discount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Скидка</span>
            <span className="text-red-600">-{formatPrice(cart.discount)}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between font-bold">
        <span>Итого</span>
        <span>{formatPrice(cart.total)}</span>
      </div>
    </div>
  )
}

