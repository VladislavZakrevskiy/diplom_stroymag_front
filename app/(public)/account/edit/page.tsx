import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { getUserProfile } from '@/lib/api/auth'
import EditProfileForm from './EditProfileForm'

export default async function EditProfilePage() {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        redirect('/auth/login?redirect=/account/edit')
    }

    const user = await getUserProfile(accessToken)

    if (!user) {
        redirect('/auth/login?redirect=/account/edit')
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Редактирование профиля</h1>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-1">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Меню</h2>
                        <nav className="space-y-2">
                            <Link
                                href="/account"
                                className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Профиль
                            </Link>
                            <Link
                                href="/account/orders"
                                className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Мои заказы
                            </Link>
                            <Link
                                href="/account/addresses"
                                className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Адреса доставки
                            </Link>
                            <Link
                                href="/account/password"
                                className="block rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Сменить пароль
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-6 text-xl font-bold">Личные данные</h2>
                        <EditProfileForm user={user} />
                    </div>
                </div>
            </div>
        </div>
    )
}
