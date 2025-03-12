import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import AddressForm from '../AddressForm'

export default async function NewAddressPage() {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        redirect('/auth/login?redirect=/account/addresses/new')
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Добавление адреса</h1>

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
                                className="block rounded-md bg-gray-100 px-4 py-2 font-medium"
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
                        <h2 className="mb-6 text-xl font-bold">Новый адрес доставки</h2>
                        <AddressForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
