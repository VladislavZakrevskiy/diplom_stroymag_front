import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getUserById } from '@/lib/api/admin'
import { formatDate } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import UserStatusForm from '@/components/admin/UserStatusForm'
import AdminOrdersTable from '@/components/admin/AdminOrdersTable'

export default async function AdminUserDetailPage({ params }: { params: { id: string } }) {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        return null
    }

    const user = await getUserById(accessToken, params.id)

    if (!user) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Link href="/admin/users" className="mr-4 text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-3xl font-bold">Профиль пользователя</h1>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-6 text-xl font-bold">Информация о пользователе</h2>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Имя</h3>
                                <p className="font-medium">
                                    {user.firstName} {user.lastName}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                <p>{user.email}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Дата регистрации</h3>
                                <p>{formatDate(user.createdAt)}</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Роль</h3>
                                <p className="capitalize">{user.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Статус пользователя</h2>

                        <UserStatusForm user={user} />
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-6 text-xl font-bold">Заказы пользователя</h2>

                        {user.orders && user.orders.length > 0 ? (
                            <AdminOrdersTable orders={user.orders} />
                        ) : (
                            <div className="rounded-lg border border-dashed p-8 text-center">
                                <p className="text-gray-500">У пользователя пока нет заказов</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-6 text-xl font-bold">Адреса доставки</h2>

                        {user.addresses && user.addresses.length > 0 ? (
                            <div className="space-y-4">
                                {user.addresses.map((address) => (
                                    <div key={address.id} className="rounded-lg border p-4">
                                        <div className="mb-2 flex items-center justify-between">
                                            <h3 className="font-medium">{address.title}</h3>
                                            {address.isDefault && (
                                                <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                                    По умолчанию
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600">
                                            {address.zipCode}, {address.city}, {address.street}, {address.house}
                                            {address.apartment && `, кв. ${address.apartment}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed p-8 text-center">
                                <p className="text-gray-500">У пользователя пока нет сохраненных адресов</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
