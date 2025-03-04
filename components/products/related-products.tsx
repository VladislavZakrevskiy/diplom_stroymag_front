import { getRelatedProducts } from "@/lib/api/products"
import ProductCard from "./product-card"

interface RelatedProductsProps {
  productId: string
}

export default async function RelatedProducts({ productId }: RelatedProductsProps) {
  const products = await getRelatedProducts(productId)

  if (products.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

