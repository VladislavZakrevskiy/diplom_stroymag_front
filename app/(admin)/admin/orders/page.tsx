import { cookies } from 'next/headers'
import { getAdminOrders } from '@/lib/api/admin'
import AdminOrdersTable from '@/components/admin/AdminOrdersTable'
import AdminOrdersFilter from '@/components/admin/AdminOrdersFilter'

export default async function AdminOrdersPage({
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
    const status = typeof searchParams.status === 'string' ? searchParams.status : ''

    const { orders, totalPages } = await getAdminOrders(accessToken, {
        page,
        status,
    })

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Управление заказами</h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                <div className="md:col-span-1">
                    <AdminOrdersFilter selectedStatus={status} />
                </div>

                <div className="md:col-span-3">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Список заказов</h2>

                        <AdminOrdersTable orders={orders} />

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-6 flex justify-center">
                                <nav className="flex space-x-1">
                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <a
                                            key={i}
                                            href={`/admin/orders?page=${i + 1}${status ? `&status=${status}` : ''}`}
                                            className={`flex h-9 w-9 items-center justify-center rounded-md ${
                                                page === i + 1
                                                    ? 'bg-gray-800 text-white'
                                                    : 'bg-white text-gray-800 hover:bg-gray-100'
                                            }`}
                                        >
                                            {i + 1}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
