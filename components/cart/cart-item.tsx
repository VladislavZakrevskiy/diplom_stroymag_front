'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/cart-context'
import { Trash2, Plus, Minus } from 'lucide-react'
import type { CartItem as CartItemType } from '@/types/cart'
import { formatPrice } from '@/lib/utils'

interface CartItemProps {
    item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCart()
    const [isLoading, setIsLoading] = useState(false)

    const handleUpdateQuantity = async (newQuantity: number) => {
        if (newQuantity < 1) return

        setIsLoading(true)
        try {
            await updateQuantity(item.productId, newQuantity)
        } catch (error) {
            console.error('Failed to update quantity:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRemove = async () => {
        setIsLoading(true)
        try {
            await removeItem(item.productId)
        } catch (error) {
            console.error('Failed to remove item:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center border-b pb-6">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                <Image
                    src={item.product.images[0] || '/placeholder.svg'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="ml-4 flex-grow">
                <Link href={`/products/${item.productId}`} className="font-medium hover:text-gray-600">
                    {item.product.name}
                </Link>
                <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => handleUpdateQuantity(item.quantity - 1)}
                            className="rounded-l-md border border-gray-300 p-1 hover:bg-gray-100"
                            disabled={isLoading || item.quantity <= 1}
                            aria-label="Уменьшить количество"
                        >
                            <Minus size={16} />
                        </button>
                        <span className="flex h-7 w-10 items-center justify-center border border-gray-300 text-sm">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => handleUpdateQuantity(item.quantity + 1)}
                            className="rounded-r-md border border-gray-300 p-1 hover:bg-gray-100"
                            disabled={isLoading}
                            aria-label="Увеличить количество"
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                        <button
                            onClick={handleRemove}
                            className="text-gray-500 hover:text-red-600"
                            disabled={isLoading}
                            aria-label="Удалить товар"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
