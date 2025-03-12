import { Suspense } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/api/products'
import AddToCartButton from '@/components/cart/add-to-cart-button'
import ProductTabs from '@/components/products/product-tabs'
import RelatedProducts from '@/components/products/related-products'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { formatPrice } from '@/lib/utils'

export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id)

    if (!product) {
        return {
            title: 'Товар не найден',
            description: 'Запрашиваемый товар не найден в нашем каталоге',
        }
    }

    return {
        title: `${product.name} - СтройМаркет`,
        description: product.description.substring(0, 160),
    }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id)

    if (!product) {
        notFound()
    }

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative aspect-square">
                    <Image
                        src={product.images?.[0] || '/placeholder.svg'}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="text-gray-600">Артикул: {product.id}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                        {product.discount > 0 && (
                            <span className="text-gray-500 line-through">
                                {formatPrice(product.price * (product.discount / 100 + 1))}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <span
                            className={`px-2 py-1 rounded text-sm ${
                                product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {product.stock > 0 ? 'В наличии' : 'Нет в наличии'}
                        </span>
                        {product.stock > 0 && (
                            <span className="text-gray-600">
                                {product.stock > 10
                                    ? 'Много'
                                    : product.stock > 5
                                    ? 'Достаточно'
                                    : `Осталось ${product.stock} шт.`}
                            </span>
                        )}
                    </div>

                    <div className="border-t border-b py-4 my-4">
                        <p className="text-gray-700">{product.description}</p>
                    </div>

                    <div className="flex gap-4">
                        <AddToCartButton product={product} />
                    </div>
                </div>
            </div>

            <ProductTabs product={product} />

            <section>
                <h2 className="text-2xl font-bold mb-6">Похожие товары</h2>
                <Suspense fallback={<LoadingSpinner />}>
                    <RelatedProducts productId={product.id} />
                </Suspense>
            </section>
        </div>
    )
}
