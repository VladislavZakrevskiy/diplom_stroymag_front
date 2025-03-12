import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import { getAdminProducts } from '@/lib/api/admin'
import { formatPrice } from '@/lib/utils'
import { Plus, Search, Filter } from 'lucide-react'
import AdminProductsFilter from '@/components/admin/AdminProductsFilter'

export default async function AdminProductsPage({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        return null
    }

    const page = typeof searchParams.page === 'string' ? Number.parseInt(searchParams.page) : 1
    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    const category = typeof searchParams.category === 'string' ? searchParams.category : ''
    const inStock = typeof searchParams.inStock === 'string' ? searchParams.inStock === 'true' : undefined

    const {
        data: products,
        meta: { totalPages },
    } = await getAdminProducts(accessToken, {
        page,
        search,
        category,
        inStock,
    })

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Управление товарами</h1>
                <Link href="/admin/products/new" className="btn-primary flex items-center">
                    <Plus className="mr-2 h-5 w-5" />
                    Добавить товар
                </Link>
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full md:w-3/4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Поиск товаров..."
                            className="input pl-10 pr-4"
                            defaultValue={search}
                            // onChange={(e) => {
                            //     // Client-side search will be implemented with a form
                            // }}
                        />
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="w-full md:w-1/4">
                    <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50">
                        <Filter className="mr-2 h-5 w-5" />
                        Фильтры
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                    <AdminProductsFilter selectedCategory={category} inStock={inStock} />
                </div>

                <div className="md:col-span-2">
                    {products?.length > 0 ? (
                        <div className="space-y-6">
                            <div className="rounded-lg bg-white shadow-md">
                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b text-left">
                                                <th className="p-4 font-medium">Товар</th>
                                                <th className="p-4 font-medium">SKU</th>
                                                <th className="p-4 font-medium">Цена</th>
                                                <th className="p-4 font-medium">Наличие</th>
                                                <th className="p-4 font-medium">Действия</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product) => (
                                                <tr key={product.id} className="border-b hover:bg-gray-50">
                                                    <td className="p-4">
                                                        <div className="flex items-center">
                                                            <div className="relative mr-3 h-10 w-10 flex-shrink-0">
                                                                <Image
                                                                    src={product.images?.[0] || '/placeholder.svg'}
                                                                    alt={product.name}
                                                                    fill
                                                                    className="rounded-md object-cover"
                                                                />
                                                            </div>
                                                            <div className="truncate">
                                                                <Link
                                                                    href={`/admin/products/${product.id}`}
                                                                    className="font-medium hover:text-gray-900"
                                                                >
                                                                    {product.name}
                                                                </Link>
                                                                <div className="text-sm text-gray-500">
                                                                    {product.category.name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 text-gray-600">{product.id}</td>
                                                    <td className="p-4 font-medium">{formatPrice(product.price)}</td>
                                                    <td className="p-4">
                                                        <span
                                                            className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                                                                product.stock > 0
                                                                    ? 'bg-green-100 text-green-800'
                                                                    : 'bg-red-100 text-red-800'
                                                            }`}
                                                        >
                                                            {product.stock > 0 ? 'В наличии' : 'Нет в наличии'}
                                                        </span>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="flex space-x-2">
                                                            <Link
                                                                href={`/admin/products/${product.id}`}
                                                                className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200"
                                                            >
                                                                Редактировать
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center">
                                <nav className="flex space-x-1">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <Link
                                            key={i}
                                            href={`/admin/products?page=${i + 1}${search ? `&search=${search}` : ''}${
                                                category ? `&category=${category}` : ''
                                            }${inStock !== undefined ? `&inStock=${inStock}` : ''}`}
                                            className={`flex h-9 w-9 items-center justify-center rounded-md ${
                                                page === i + 1
                                                    ? 'bg-gray-800 text-white'
                                                    : 'bg-white text-gray-800 hover:bg-gray-100'
                                            }`}
                                        >
                                            {i + 1}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-lg border p-8 text-center">
                            <p className="text-gray-500">Товары не найдены</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
