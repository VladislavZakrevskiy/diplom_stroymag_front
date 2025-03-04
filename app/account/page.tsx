import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import Link from "next/link"
import { getUserProfile } from "@/lib/api/auth"
import { formatDate } from "@/lib/utils"

export default async function AccountPage() {
  // Check if user is authenticated
  const refreshToken = cookies().get("refreshToken")?.value

  if (!refreshToken) {
    redirect("/auth/login?redirect=/account")
  }

  // Fetch user profile
  const user = await getUserProfile(refreshToken)

  if (!user) {
    redirect("/auth/login?redirect=/account")
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Личный кабинет</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold">Меню</h2>
            <nav className="space-y-2">
              <Link href="/account" className="block rounded-md bg-gray-100 px-4 py-2 font-medium">
                Профиль
              </Link>
              <Link href="/account/orders" className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100">
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
            <h2 className="mb-6 text-xl font-bold">Личные данные</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Имя</h3>
                  <p>{user.firstName}</p>
                </div>
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Фамилия</h3>
                  <p>{user.lastName}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium text-gray-500">Email</h3>
                <p>{user.email}</p>
              </div>

              {user.phone && (
                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-500">Телефон</h3>
                  <p>{user.phone}</p>
                </div>
              )}

              <div>
                <h3 className="mb-1 text-sm font-medium text-gray-500">Дата регистрации</h3>
                <p>{formatDate(user.createdAt)}</p>
              </div>
            </div>

            <div className="mt-6 border-t pt-6">
              <Link href="/account/edit" className="btn-primary">
                Редактировать профиль
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

