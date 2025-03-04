import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Link from "next/link"
import { getUserOrders } from "@/lib/api/orders"
import { formatDate, formatPrice } from "@/lib/utils"

export default async function OrdersPage() {
  // Check if user is authenticated
  const refreshToken = cookies().get("refreshToken")?.value

  if (!refreshToken) {
    redirect("/auth/login?redirect=/account/orders")
  }

  // Fetch user orders
  const orders = await getUserOrders(refreshToken)

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Мои заказы</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">Меню</h2>
            <nav className="space-y-2">
              <Link href="/account" className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">
                Профиль
              </Link>
              <Link href="/account/orders" className="block rounded-md bg-gray-100 px-4 py-2 font-medium">
                Мои заказы
              </Link>
              <Link href="/account/addresses" className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">
                Адреса доставки
              </Link>
              <Link href="/account/password" className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">
                Сменить пароль
              </Link>
            </nav>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-6 text-xl font-bold">История заказов</h2>

            {orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-lg border p-4">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="text-sm text-gray-500">Заказ №{order.number}</div>
                        <div className="font-medium">{formatDate(order.createdAt)}</div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold">{formatPrice(order.total)}</div>
                          <div className="text-sm text-gray-500">{order.itemsCount} товаров</div>
                        </div>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            order.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status === "completed"
                            ? "Выполнен"
                            : order.status === "processing"
                              ? "В обработке"
                              : order.status === "cancelled"
                                ? "Отменен"
                                : order.status === "shipped"
                                  ? "Отправлен"
                                  : "Новый"}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/account/orders/${order.id}`}
                      className="text-sm font-medium text-gray-800 hover:underline"
                    >
                      Подробнее
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="mb-4 text-gray-600">У вас пока нет заказов</p>
                <Link href="/products" className="btn-primary">
                  Перейти в каталог
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

