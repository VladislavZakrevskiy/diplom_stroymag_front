import { redirect, notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { getOrderById } from '@/lib/api/orders'
import { formatDate, formatPrice } from '@/lib/utils'
import { CheckCircle, Package, Truck, Clock, CreditCard } from 'lucide-react'
import { OrderStatus } from '@/types/order'

export default async function OrderSuccessPage({ params }: { params: { orderId: string } }) {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        redirect('/auth/login')
    }

    const order = await getOrderById(accessToken, params.orderId)
    console.log(order)

    if (!order) {
        notFound()
    }

    return (
        <div className="mx-auto max-w-2xl space-y-8">
            <div className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h1 className="mb-2 text-3xl font-bold">Заказ успешно оформлен!</h1>
                <p className="text-gray-600">
                    Спасибо за ваш заказ. Мы отправили подтверждение на вашу электронную почту.
                </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-6 border-b pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                            <h2 className="text-xl font-bold">Заказ #{order.trackingNumber}</h2>
                            <p className="text-gray-600">от {formatDate(order.createdAt)}</p>
                        </div>
                        <span
                            className={`rounded-full px-3 py-1 text-sm font-medium ${
                                order.status === OrderStatus.DELIVERED
                                    ? 'bg-green-100 text-green-800'
                                    : order.status === OrderStatus.PROCESSING
                                    ? 'bg-blue-100 text-blue-800'
                                    : order.status === OrderStatus.CANCELLED
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                            {order.status === OrderStatus.DELIVERED
                                ? 'Выполнен'
                                : order.status === OrderStatus.PROCESSING
                                ? 'В обработке'
                                : order.status === OrderStatus.CANCELLED
                                ? 'Отменен'
                                : order.status === OrderStatus.SHIPPED
                                ? 'Отправлен'
                                : 'Новый'}
                        </span>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="mb-3 text-lg font-bold">Детали заказа</h3>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center border-b pb-4">
                                <div className="flex-grow">
                                    <div className="font-medium">{item.product.name}</div>
                                    <div className="text-sm text-gray-600">
                                        {formatPrice(item.price)} × {item.quantity}
                                    </div>
                                </div>
                                <div className="font-medium">{formatPrice(item.price * item.quantity)}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <h3 className="mb-2 text-lg font-bold">Информация о доставке</h3>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <div className="flex items-center">
                                <Truck className="mr-2 h-5 w-5 text-gray-600" />
                                <div>
                                    <div className="font-medium">
                                        {order.deliveryMethod === 'standard'
                                            ? 'Стандартная доставка'
                                            : order.deliveryMethod === 'express'
                                            ? 'Экспресс-доставка'
                                            : 'Самовывоз'}
                                    </div>
                                    {order.address && <div className="text-sm text-gray-600">{order.address}</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 text-lg font-bold">Способ оплаты</h3>
                        <div className="rounded-lg bg-gray-50 p-4">
                            <div className="flex items-center">
                                {order.paymentMethod === 'card' ? (
                                    <>
                                        <CreditCard className="mr-2 h-5 w-5 text-gray-600" />
                                        <div className="font-medium">Банковская карта</div>
                                    </>
                                ) : (
                                    <>
                                        <Package className="mr-2 h-5 w-5 text-gray-600" />
                                        <div className="font-medium">Наличными при получении</div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 space-y-2 border-b pb-4">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Товары ({order.items.length})</span>
                        <span>{formatPrice(order.items.reduce((a, b) => (a += b.price), 0))}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Доставка</span>
                        <span>{formatPrice(order.deliveryCost)}</span>
                    </div>
                </div>

                <div className="flex justify-between font-bold">
                    <span>Итого</span>
                    <span>{formatPrice(order.items.reduce((a, b) => (a += b.price), 0) + order.deliveryCost)}</span>
                </div>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-4 flex items-center text-lg font-bold">
                    <Clock className="mr-2 h-5 w-5" />
                    Что дальше?
                </h3>

                <div className="space-y-4">
                    <p>
                        Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа и уточнения деталей
                        доставки.
                    </p>

                    <p>
                        Вы можете отслеживать статус вашего заказа в разделе{' '}
                        <Link href="/account/orders" className="text-gray-800 underline">
                            Мои заказы
                        </Link>
                        .
                    </p>
                </div>
            </div>

            <div className="flex justify-center">
                <Link href="/products" className="btn-primary">
                    Продолжить покупки
                </Link>
            </div>
        </div>
    )
}
