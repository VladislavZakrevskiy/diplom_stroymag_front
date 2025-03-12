import { getProducts } from '@/lib/api/products'
import ProductCard from './product-card'
import Pagination from '../ui/pagination'

interface ProductGridProps {
    page: number
    search?: string
    category?: string
    sort?: string
    minPrice?: number
    maxPrice?: number
    isSale?: boolean
}

export default async function ProductGrid({
    page = 1,
    search = '',
    category = '',
    sort = 'popular',
    minPrice,
    maxPrice,
    isSale,
}: ProductGridProps) {
    const limit = 12
    const {
        data,
        meta: { total },
    } = await getProducts({
        page,
        limit,
        search,
        category,
        sort,
        minPrice,
        isSale,
        maxPrice,
    })

    if (data.length === 0) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">Товары не найдены</h3>
                <p className="text-gray-600">Попробуйте изменить параметры поиска или фильтрации</p>
            </div>
        )
    }

    const totalPages = Math.ceil(total / limit)

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    baseUrl={`/products?search=${search}&category=${category}&sort=${sort}${
                        minPrice ? `&minPrice=${minPrice}` : ''
                    }${maxPrice ? `&maxPrice=${maxPrice}` : ''}`}
                />
            )}
        </div>
    )
}
