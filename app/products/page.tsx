import { Suspense } from 'react'
import ProductGrid from '@/components/products/product-grid'
import FilterSidebar from '@/components/products/filter-sidebar'
import ProductSearch from '@/components/products/product-search'
import ProductSort from '@/components/products/product-sort'
import LoadingSpinner from '@/components/ui/loading-spinner'
import { getProducts } from '@/lib/api/products'
import { getCategories } from '@/lib/api/categories'

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const page = typeof searchParams.page === 'string' ? Number.parseInt(searchParams.page) : 1
    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    const category = typeof searchParams.category === 'string' ? searchParams.category : ''
    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : 'price_asc'
    const minPrice = typeof searchParams.minPrice === 'string' ? Number.parseInt(searchParams.minPrice) : undefined
    const maxPrice = typeof searchParams.maxPrice === 'string' ? Number.parseInt(searchParams.maxPrice) : undefined
    const categories = await getCategories()
    console.log(categories)

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>

            <div className="mb-6">
                <ProductSearch initialValue={search} />
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4">
                    <FilterSidebar
                        categories={categories}
                        category={category}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                    />
                </div>

                <div className="w-full md:w-3/4">
                    <div className="mb-4 flex justify-between items-center">
                        <p className="text-gray-600">
                            Найдено товаров:{' '}
                            <Suspense fallback={<span>...</span>}>
                                <ProductCount
                                    search={search}
                                    category={category}
                                    minPrice={minPrice}
                                    maxPrice={maxPrice}
                                />
                            </Suspense>
                        </p>
                        <ProductSort currentSort={sort} />
                    </div>

                    <Suspense fallback={<LoadingSpinner />}>
                        <ProductGrid
                            page={page}
                            search={search}
                            category={category}
                            sort={sort}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

async function ProductCount({
    search,
    category,
    minPrice,
    maxPrice,
}: {
    search: string
    category: string
    minPrice?: number
    maxPrice?: number
}) {
    const { meta } = await getProducts({
        search,
        category,
        minPrice,
        maxPrice,
        page: 1,
        limit: 1,
    })

    return <span>{meta.total}</span>
}
