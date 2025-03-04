import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="mb-6 rounded-full bg-gray-100 p-6">
        <ShoppingCart size={64} className="text-gray-400" />
      </div>

      <h1 className="mb-2 text-2xl font-bold">Ваша корзина пуста</h1>
      <p className="mb-6 text-center text-gray-600">Добавьте товары в корзину, чтобы оформить заказ</p>

      <Link href="/products" className="btn-primary">
        Перейти в каталог
      </Link>
    </div>
  )
}

