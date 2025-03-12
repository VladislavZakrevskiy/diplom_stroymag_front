import { redirect, notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import { getOrderById } from '@/lib/api/orders'
import { formatDate, formatPrice } from '@/lib/utils'
import { ArrowLeft, Package, Truck, CreditCard, Clock, CheckCircle, XCircle } from 'lucide-react'
import CancelOrderButton from './cancel'
import { OrderStatus } from '@/types/order'

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        redirect('/auth/login?redirect=/account/orders')
    }

    const order = await getOrderById(accessToken, params.id)

    if (!order) {
        notFound()
    }

    // Определение статуса заказа для отображения
    const getOrderStatusInfo = (status: string) => {
        switch (status) {
            case OrderStatus.PENDING:
                return {
                    label: 'Новый',
                    color: 'bg-blue-100 text-blue-800',
                    icon: Clock,
                    description: 'Заказ принят и ожидает обработки',
                }
            case OrderStatus.PROCESSING:
                return {
                    label: 'В обработке',
                    color: 'bg-yellow-100 text-yellow-800',
                    icon: Package,
                    description: 'Заказ обрабатывается и готовится к отправке',
                }
            case OrderStatus.DELIVERED:
                return {
                    label: 'Отправлен',
                    color: 'bg-purple-100 text-purple-800',
                    icon: Truck,
                    description: 'Заказ передан в службу доставки',
                }
            case OrderStatus.SHIPPED:
                return {
                    label: 'Выполнен',
                    color: 'bg-green-100 text-green-800',
                    icon: CheckCircle,
                    description: 'Заказ успешно доставлен',
                }
            case OrderStatus.CANCELLED:
                return {
                    label: 'Отменен',
                    color: 'bg-red-100 text-red-800',
                    icon: XCircle,
                    description: 'Заказ был отменен',
                }
            default:
                return {
                    label: status,
                    color: 'bg-gray-100 text-gray-800',
                    icon: Clock,
                    description: 'Статус заказа',
                }
        }
    }

    const statusInfo = getOrderStatusInfo(order.status)
    const StatusIcon = statusInfo.icon

    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Link href="/account/orders" className="mr-4 text-gray-600 hover:text-gray-900">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-3xl font-bold">Заказ #{order.trackingNumber}</h1>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    {/* Статус заказа */}
                    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                        <div className="flex items-start">
                            <div
                                className={`mr-4 rounded-full p-3 ${statusInfo.color.split(' ')[0]} ${statusInfo.color
                                    .split(' ')[0]
                                    .replace('100', '50')}`}
                            >
                                <StatusIcon className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="flex items-center">
                                    <span
                                        className={`mr-2 rounded-full px-3 py-1 text-sm font-medium ${statusInfo.color}`}
                                    >
                                        {statusInfo.label}
                                    </span>
                                    <span className="text-sm text-gray-500">от {formatDate(order.createdAt)}</span>
                                </div>
                                <p className="mt-1 text-gray-600">{statusInfo.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Товары в заказе */}
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Товары в заказе</h2>

                        <div className="space-y-4">
                            {order.items.map((item) => (
                                <div key={item.id} className="flex border-b pb-4">
                                    <div className="relative mr-4 h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                                        <Image
                                            src={item.product.images[0] || '/placeholder.svg'}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-grow flex-col">
                                        <Link
                                            href={`/products/${item.productId}`}
                                            className="font-medium hover:text-gray-600"
                                        >
                                            {item.product.name}
                                        </Link>
                                        <div className="mt-auto flex items-end justify-between">
                                            <div className="text-sm text-gray-500">
                                                {formatPrice(item.price)} × {item.quantity}
                                            </div>
                                            <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 space-y-2 border-t pt-4">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Товары ({order.items.length})</span>
                                <span>
                                    {formatPrice(order.items.reduce((a, b) => (a += b.product.price * b.quantity), 0))}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600">Доставка</span>
                                <span>{formatPrice(order.deliveryCost)}</span>
                            </div>

                            <div className="flex justify-between border-t pt-2 font-bold">
                                <span>Итого</span>
                                <span>
                                    {formatPrice(order.items.reduce((a, b) => (a += b.product.price * b.quantity), 0))}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1">
                    {/* Информация о доставке */}
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Информация о доставке</h2>

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center">
                                    <Truck className="mr-2 h-5 w-5 text-gray-600" />
                                    <h3 className="font-medium">Способ доставки</h3>
                                </div>
                                <p className="mt-1 text-gray-600">
                                    {order.deliveryMethod === 'standard'
                                        ? 'Стандартная доставка'
                                        : order.deliveryMethod === 'express'
                                        ? 'Экспресс-доставка'
                                        : 'Самовывоз'}
                                </p>
                            </div>

                            {order.address && (
                                <div>
                                    <div className="flex items-center">
                                        <Package className="mr-2 h-5 w-5 text-gray-600" />
                                        <h3 className="font-medium">Адрес доставки</h3>
                                    </div>
                                    <p className="mt-1 text-gray-600">{order.address}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Информация об оплате */}
                    <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Информация об оплате</h2>

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center">
                                    <CreditCard className="mr-2 h-5 w-5 text-gray-600" />
                                    <h3 className="font-medium">Способ оплаты</h3>
                                </div>
                                <p className="mt-1 text-gray-600">
                                    {order.paymentMethod === 'card' ? 'Банковская карта' : 'Наличными при получении'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Действия с заказом */}
                    {(order.status === OrderStatus.PENDING || order.status === OrderStatus.PROCESSING) && (
                        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
                            <h2 className="mb-4 text-xl font-bold">Действия</h2>

                            <div className="space-y-4">
                                {order.status === OrderStatus.PENDING && <CancelOrderButton orderId={order.id} />}

                                <Link
                                    href="/contacts"
                                    className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-gray-700 hover:bg-gray-50"
                                >
                                    Связаться с нами
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
