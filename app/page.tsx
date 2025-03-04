import { Suspense } from "react"
import Link from "next/link"
import CategoryList from "@/components/categories/category-list"
import FeaturedProducts from "@/components/products/featured-products"
import HeroSection from "@/components/home/hero-section"
import PromoSection from "@/components/home/promo-section"
import LoadingSpinner from "@/components/ui/loading-spinner"

export default function Home() {
  return (
    <div className="space-y-12">
      <HeroSection />

      <section>
        <h2 className="text-2xl font-bold mb-6">Категории товаров</h2>
        <Suspense fallback={<LoadingSpinner />}>
          <CategoryList />
        </Suspense>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Популярные товары</h2>
          <Link href="/products" className="text-gray-800 hover:underline">
            Смотреть все
          </Link>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedProducts />
        </Suspense>
      </section>

      <PromoSection />
    </div>
  )
}

