import type React from 'react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { getAdminStats } from '@/lib/api/admin'
import { formatPrice } from '@/lib/utils'
import { Package, ShoppingBag, Users, TrendingUp, ArrowRight, TrendingDown } from 'lucide-react'
import AdminOrdersTable from '@/components/admin/AdminOrdersTable'

export default async function AdminDashboard() {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        return null
    }

    const stats = await getAdminStats(accessToken)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Панель управления</h1>
                <div className="text-sm text-gray-500">Последнее обновление: {new Date().toLocaleString()}</div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                <StatCard title="Всего заказов" value={stats.totalOrders} icon={ShoppingBag} href="/admin/orders" />
                <StatCard
                    title="Всего продаж"
                    value={formatPrice(stats.totalRevenue)}
                    icon={TrendingUp}
                    href="/admin/orders"
                />
                <StatCard title="Всего товаров" value={stats.totalProducts} icon={Package} href="/admin/products" />
                <StatCard title="Всего пользователей" value={stats.totalUsers} icon={Users} href="/admin/users" />
                <StatCard
                    title="Кончающиеся товары"
                    value={stats.lowStockProducts}
                    icon={TrendingDown}
                    href="/admin/products"
                />
            </div>

            {/* Recent Orders */}
            <div className="rounded-lg bg-white p-6 shadow-md">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold">Последние заказы</h2>
                    <Link href="/admin/orders" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                        Все заказы
                        <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
                <AdminOrdersTable orders={stats.recentOrders} />
            </div>

            {/* Sales Chart */}
            <div className="rounded-lg bg-white p-6 shadow-md">
                <h2 className="mb-4 text-xl font-bold">Продажи за последние 30 дней</h2>
                <div className="h-80 w-full">
                    <div className="flex h-full items-center justify-center">
                        <p className="text-gray-500">График продаж будет отображаться здесь</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({
    title,
    value,
    icon: Icon,
    href,
}: {
    title: string
    value: string | number
    icon: React.ElementType
    href: string
}) {
    return (
        <Link href={href}>
            <div className="rounded-lg bg-white p-6 shadow-md transition-transform hover:scale-105">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-500">{title}</h3>
                    <div className="rounded-full bg-gray-100 p-2 text-gray-600">
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
                <div className="text-3xl font-bold">{value}</div>
            </div>
        </Link>
    )
}
