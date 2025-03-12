import Link from 'next/link'
import { formatDate, formatPrice } from '@/lib/utils'
import { OrderStatus, type Order } from '@/types/order'

interface AdminOrdersTableProps {
    orders: Order[]
}

export default function AdminOrdersTable({ orders }: AdminOrdersTableProps) {
    if (!orders || orders?.length === 0) {
        return (
            <div className="rounded-lg border p-8 text-center">
                <p className="text-gray-500">Нет заказов для отображения</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b text-left">
                        <th className="pb-3 pr-4 font-medium">№ заказа</th>
                        <th className="pb-3 pr-4 font-medium">Дата</th>
                        <th className="pb-3 pr-4 font-medium">Статус</th>
                        <th className="pb-3 pr-4 font-medium">Сумма</th>
                        <th className="pb-3 font-medium">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="py-4 pr-4">#{order.trackingNumber}</td>
                            <td className="py-4 pr-4">{formatDate(order.createdAt)}</td>
                            <td className="py-4 pr-4">
                                <OrderStatusBadge status={order.status} />
                            </td>
                            <td className="py-4 pr-4 font-medium">{formatPrice(order.totalAmount)}</td>
                            <td className="py-4">
                                <Link
                                    href={`/admin/orders/${order.id}`}
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
    )
}

function OrderStatusBadge({ status }: { status: string }) {
    let bgColor = ''
    let textColor = ''
    let label = ''

    switch (status) {
        case OrderStatus.PENDING:
            bgColor = 'bg-blue-100'
            textColor = 'text-blue-800'
            label = 'Новый'
            break
        case OrderStatus.PROCESSING:
            bgColor = 'bg-yellow-100'
            textColor = 'text-yellow-800'
            label = 'В обработке'
            break
        case OrderStatus.SHIPPED:
            bgColor = 'bg-purple-100'
            textColor = 'text-purple-800'
            label = 'Отправлен'
            break
        case OrderStatus.DELIVERED:
            bgColor = 'bg-green-100'
            textColor = 'text-green-800'
            label = 'Выполнен'
            break
        case OrderStatus.CANCELLED:
            bgColor = 'bg-red-100'
            textColor = 'text-red-800'
            label = 'Отменен'
            break
        default:
            bgColor = 'bg-gray-100'
            textColor = 'text-gray-800'
            label = status
    }

    return (
        <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${bgColor} ${textColor}`}>
            {label}
        </span>
    )
}
