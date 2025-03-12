import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getOrderById } from '@/lib/api/orders'
import { formatDate, formatPrice } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import OrderStatusForm from '@/components/admin/OrderStatusForm'

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        return null
    }

    const order = await getOrderById(accessToken, params.id)

    if (!order) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/admin/orders" className="mr-4 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-3xl font-bold">Заказ #{order.number}</h1>
                </div>
                <div className="text-sm text-gray-500">{formatDate(order.createdAt)}</div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Товары в заказе</h2>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b text-left">
                                        <th className="pb-3 pr-4 font-medium">Товар</th>
                                        <th className="pb-3 pr-4 font-medium">Цена</th>
                                        <th className="pb-3 pr-4 font-medium">Кол-во</th>
                                        <th className="pb-3 font-medium">Сумма</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="py-4 pr-4">
                                                <Link
                                                    href={`/admin/products/${item.productId}`}
                                                    className="font-medium hover:text-gray-900"
                                                >
                                                    {item.name}
                                                </Link>
                                            </td>
                                            <td className="py-4 pr-4">{formatPrice(item.price)}</td>
                                            <td className="py-4 pr-4">{item.quantity}</td>
                                            <td className="py-4 font-medium">
                                                {formatPrice(item.price * item.quantity)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 space-y-2 border-t pt-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Товары ({order.items.length})</span>
                                <span>{formatPrice(order.subtotal)}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Доставка</span>
                                <span>{formatPrice(order.deliveryCost)}</span>
                            </div>

                            {order.discount > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Скидка</span>
                                    <span className="text-red-600">-{formatPrice(order.discount)}</span>
                                </div>
                            )}

                            <div className="flex justify-between border-t pt-2 font-bold">
                                <span>Итого</span>
                                <span>{formatPrice(order.total)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Информация о доставке</h2>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <h3 className="mb-2 text-lg font-medium">Адрес доставки</h3>
                                {order.address ? (
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p>
                                            {order.address.city}, {order.address.street}, {order.address.house}
                                        </p>
                                        {order.address.apartment && <p>Квартира/офис: {order.address.apartment}</p>}
                                        <p>Индекс: {order.address.zipCode}</p>
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Самовывоз</p>
                                )}
                            </div>

                            <div>
                                <h3 className="mb-2 text-lg font-medium">Способ доставки</h3>
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p>
                                        {order.deliveryMethod === 'standard'
                                            ? 'Стандартная доставка'
                                            : order.deliveryMethod === 'express'
                                            ? 'Экспресс-доставка'
                                            : 'Самовывоз'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {order.comment && (
                            <div className="mt-6">
                                <h3 className="mb-2 text-lg font-medium">Комментарий к заказу</h3>
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <p>{order.comment}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:col-span-1">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Статус заказа</h2>

                        <OrderStatusForm order={order} />
                    </div>

                    <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Информация о клиенте</h2>

                        {order.user ? (
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Имя</h3>
                                    <p>
                                        {order.user.firstName} {order.user.lastName}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                    <p>{order.user.email}</p>
                                </div>

                                {order.user.phone && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">Телефон</h3>
                                        <p>{order.user.phone}</p>
                                    </div>
                                )}

                                <div className="pt-2">
                                    <Link
                                        href={`/admin/users/${order.user.id}`}
                                        className="text-sm font-medium text-gray-800 hover:underline"
                                    >
                                        Просмотреть профиль
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">Информация о клиенте недоступна</p>
                        )}
                    </div>

                    <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Способ оплаты</h2>

                        <div className="rounded-lg bg-gray-50 p-4">
                            <p>
                                {order.paymentMethod === 'card'
                                    ? 'Банковская карта'
                                    : order.paymentMethod === 'cash'
                                    ? 'Наличными при получении'
                                    : 'Онлайн оплата'}
                            </p>

                            {order.paymentMethod === 'card' && (
                                <p className="mt-2 text-sm text-gray-500">
                                    Оплачено {formatDate(order.paidAt || order.createdAt)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
