import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { getUserAddresses } from '@/lib/api/addresses'
import { Plus, MapPin, Edit, Trash2 } from 'lucide-react'

export default async function AddressesPage() {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        redirect('/auth/login?redirect=/account/addresses')
    }

    const addresses = await getUserAddresses(accessToken)

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Адреса доставки</h1>

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
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold">Мои адреса</h2>
                            <Link href="/account/addresses/new" className="btn-primary flex items-center gap-2">
                                <Plus size={16} />
                                <span>Добавить адрес</span>
                            </Link>
                        </div>

                        {addresses.length > 0 ? (
                            <div className="space-y-4">
                                {addresses.map((address) => (
                                    <div key={address.id} className="rounded-lg border p-4">
                                        <div className="mb-2 flex items-start justify-between">
                                            <div className="flex items-start">
                                                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-gray-600" />
                                                <div>
                                                    <h3 className="font-medium">{address.title}</h3>
                                                    <p className="text-gray-600">
                                                        {address.zipCode}, {address.city}, {address.street},{' '}
                                                        {address.house}
                                                        {address.apartment && `, кв. ${address.apartment}`}
                                                    </p>
                                                    {address.isDefault && (
                                                        <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                                                            Адрес по умолчанию
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/account/addresses/${address.id}`}
                                                    className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                                                    aria-label="Редактировать"
                                                >
                                                    <Edit size={18} />
                                                </Link>
                                                <form action={`/api/addresses/${address.id}/delete`} method="POST">
                                                    <button
                                                        type="submit"
                                                        className="rounded-md p-1.5 text-gray-600 hover:bg-gray-100 hover:text-red-600"
                                                        aria-label="Удалить"
                                                        disabled={address.isDefault}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed p-8 text-center">
                                <MapPin size={40} className="mx-auto mb-4 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium">У вас пока нет сохраненных адресов</h3>
                                <p className="mb-4 text-gray-600">
                                    Добавьте адрес доставки, чтобы ускорить оформление заказа в будущем
                                </p>
                                <Link
                                    href="/account/addresses/new"
                                    className="btn-primary inline-flex items-center gap-2"
                                >
                                    <Plus size={16} />
                                    <span>Добавить адрес</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
