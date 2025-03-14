import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'
import AddToCartButton from '../cart/add-to-cart-button'
import type { Product } from '@/types/product'

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="card group">
            <Link href={`/products/${product.id}`} className="block relative aspect-square">
                <Image
                    src={product.images?.[0] || '/placeholder.svg'}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform group-hover:scale-105"
                />
                {product.discount > 0 && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}%
                    </span>
                )}
            </Link>

            <div className="p-4">
                <Link href={`/products/${product.id}`} className="block">
                    <h3 className="font-medium text-gray-800 mb-1 line-clamp-2 hover:text-gray-600">{product.name}</h3>
                </Link>

                <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold">{formatPrice(product.price)}</span>
                    {product.discount !== 0 && product.discount && (
                        <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.price * (product.discount / 100 + 1))}
                        </span>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock > 0 ? 'В наличии' : 'Нет в наличии'}
                    </span>

                    <AddToCartButton product={product} compact />
                </div>
            </div>
        </div>
    )
}
