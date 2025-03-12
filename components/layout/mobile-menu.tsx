'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { X } from 'lucide-react'

interface MobileMenuProps {
    onClose: () => void
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
    const pathname = usePathname()
    const { isAuthenticated, logout } = useAuth()

    useEffect(() => {
        // Close menu when pathname changes
        onClose()
    }, [onClose])

    // Prevent scrolling when menu is open
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 md:hidden">
            <div className="absolute right-0 top-0 h-full w-64 bg-white shadow-lg p-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Меню</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
                        aria-label="Закрыть меню"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="space-y-4">
                    <Link
                        href="/products"
                        className={`block py-2 ${pathname.startsWith('/products') ? 'font-medium' : ''}`}
                    >
                        Каталог
                    </Link>
                    <Link
                        href="/promotions"
                        className={`block py-2 ${pathname.startsWith('/promotions') ? 'font-medium' : ''}`}
                    >
                        Акции
                    </Link>
                    <Link
                        href="/delivery"
                        className={`block py-2 ${pathname.startsWith('/delivery') ? 'font-medium' : ''}`}
                    >
                        Доставка
                    </Link>
                    <Link
                        href="/contacts"
                        className={`block py-2 ${pathname.startsWith('/contacts') ? 'font-medium' : ''}`}
                    >
                        Контакты
                    </Link>

                    <div className="border-t my-4"></div>

                    {isAuthenticated ? (
                        <>
                            <Link href="/account" className="block py-2">
                                Личный кабинет
                            </Link>
                            <Link href="/account/orders" className="block py-2">
                                Мои заказы
                            </Link>
                            <button onClick={logout} className="block py-2 text-left w-full">
                                Выйти
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="block py-2">
                                Войти
                            </Link>
                            <Link href="/auth/register" className="block py-2">
                                Регистрация
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </div>
    )
}
