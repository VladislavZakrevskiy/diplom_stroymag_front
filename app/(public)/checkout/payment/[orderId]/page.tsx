import { redirect, notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { getOrderById } from '@/lib/api/orders'
import PaymentForm from './PaymentForm'
import { OrderStatus } from '@/types/order'

export default async function PaymentPage({ params }: { params: { orderId: string } }) {
    // Check if user is authenticated
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        redirect('/auth/login?redirect=/checkout')
    }

    // Fetch order details
    const order = await getOrderById(accessToken, params.orderId)

    if (!order) {
        notFound()
    }

    // If order is already paid, redirect to success page
    if (order.status !== OrderStatus.PENDING && order.status !== OrderStatus.PROCESSING) {
        redirect(`/checkout/success/${order.id}`)
    }

    return (
        <div className="mx-auto max-w-2xl space-y-8">
            <h1 className="text-3xl font-bold">Оплата заказа</h1>

            <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold">Заказ #{order.trackingNumber}</h2>
                    <p className="text-gray-600">Сумма к оплате: {order.totalAmount} ₽</p>
                </div>

                <PaymentForm orderId={order.id} amount={order.totalAmount} />
            </div>
        </div>
    )
}
