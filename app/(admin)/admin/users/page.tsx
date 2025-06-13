import { cookies } from 'next/headers'
import Link from 'next/link'
import { getAdminUsers } from '@/lib/api/admin'
import { formatDate } from '@/lib/utils'
import { Search } from 'lucide-react'

export default async function AdminUsersPage({
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

    const {
        data: users,
        meta: { totalPages },
    } = await getAdminUsers(accessToken, {
        page,
        search,
    })

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Управление пользователями</h1>

            <div className="w-full md:w-1/2">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Поиск пользователей..."
                        className="input pl-10 pr-4"
                        defaultValue={search}
                        // onChange={(e) => {
                        //     // Client-side search will be implemented with a form
                        // }}
                    />
                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div className="rounded-lg bg-white shadow-md">
                {users.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="p-4 font-medium">Пользователь</th>
                                    <th className="p-4 font-medium">Email</th>
                                    <th className="p-4 font-medium">Дата регистрации</th>
                                    <th className="p-4 font-medium">Заказов</th>
                                    <th className="p-4 font-medium">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4">
                                            <div className="font-medium">
                                                {user.firstName} {user.lastName}
                                            </div>
                                        </td>
                                        <td className="p-4">{user.email}</td>
                                        <td className="p-4">{formatDate(user.createdAt)}</td>
                                        <td className="p-4">{user.ordersCount}</td>
                                        <td className="p-4">
                                            <Link
                                                href={`/admin/users/${user.id}`}
                                                className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200"
                                            >
                                                Подробнее
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-gray-500">Пользователи не найдены</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center">
                    <nav className="flex space-x-1">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <Link
                                key={i}
                                href={`/admin/users?page=${i + 1}${search ? `&search=${search}` : ''}`}
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
            )}
        </div>
    )
}
