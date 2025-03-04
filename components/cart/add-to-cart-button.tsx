'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/context/cart-context'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import type { Product } from '@/types/product'

interface AddToCartButtonProps {
    product: Product
    compact?: boolean
}

export default function AddToCartButton({ product, compact = false }: AddToCartButtonProps) {
    const router = useRouter()
    const { addToCart, isInCart, updateQuantity, getItemQuantity } = useCart()
    const [isLoading, setIsLoading] = useState(false)

    const quantity = getItemQuantity(product.id)
    const isAdded = isInCart(product.id)

    const handleAddToCart = async () => {
        if (product.stock === 0) return

        setIsLoading(true)
        try {
            await addToCart(product)
        } catch (error) {
            console.error('Failed to add to cart:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUpdateQuantity = async (newQuantity: number) => {
        if (newQuantity < 1 || product.stock > 0) return

        setIsLoading(true)
        try {
            await updateQuantity(product.id, newQuantity)
        } catch (error) {
            console.error('Failed to update quantity:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (product.stock == 0) {
        return (
            <button className="btn-outline text-gray-500 cursor-not-allowed" disabled>
                {compact ? 'Нет в наличии' : 'Товар отсутствует'}
            </button>
        )
    }

    if (isAdded) {
        if (compact) {
            return (
                <button onClick={() => router.push('/cart')} className="btn-primary p-2" aria-label="Перейти в корзину">
                    <ShoppingCart size={18} />
                </button>
            )
        }

        return (
            <div className="flex items-center gap-3">
                <button
                    onClick={() => handleUpdateQuantity(quantity - 1)}
                    className="btn-outline p-2"
                    aria-label="Уменьшить количество"
                    disabled={isLoading}
                >
                    <Minus size={18} />
                </button>
                <span className="px-4">{quantity}</span>
                <button
                    onClick={() => handleUpdateQuantity(quantity + 1)}
                    className="btn-outline p-2"
                    aria-label="Увеличить количество"
                    disabled={isLoading}
                >
                    <Plus size={18} />
                </button>
            </div>
        )
    }

    if (compact) {
        return (
            <button
                onClick={handleAddToCart}
                className="btn-primary p-2"
                disabled={isLoading}
                aria-label="Добавить в корзину"
            >
                <Plus size={18} />
            </button>
        )
    }

    return (
        <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center justify-center gap-2"
            disabled={isLoading}
        >
            <ShoppingCart size={18} />
            <span>{isLoading ? 'Добавление...' : 'В корзину'}</span>
        </button>
    )
}
