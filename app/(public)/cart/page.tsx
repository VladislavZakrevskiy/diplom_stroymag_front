'use client'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { useAuth } from '@/context/auth-context'
import CartItem from '@/components/cart/cart-item'
import CartSummary from '@/components/cart/cart-summary'
import EmptyCart from '@/components/cart/empty-cart'

export default function CartPage() {
    const { cart, isLoading } = useCart()
    const { isAuthenticated } = useAuth()

    // if (isLoading) {
    //   return (
    //     <div className="flex justify-center items-center h-64">
    //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
    //     </div>
    //   )
    // }

    if (!cart || cart.items.length === 0) {
        return <EmptyCart />
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Корзина</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="space-y-6">
                            {cart.items.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <CartSummary cart={cart} />

                    <div className="mt-6">
                        <Link
                            href={isAuthenticated ? '/checkout' : '/auth/login?redirect=/checkout'}
                            className="btn-primary w-full block text-center"
                        >
                            {isAuthenticated ? 'Оформить заказ' : 'Войти для оформления'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
