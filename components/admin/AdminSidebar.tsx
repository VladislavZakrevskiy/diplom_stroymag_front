'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, Users, Tag, Settings, LogOut, ChevronDown, Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminSidebar() {
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const router = useRouter()

    const menuItems = [
        {
            title: 'Панель управления',
            icon: LayoutDashboard,
            href: '/admin',
        },
        {
            title: 'Товары',
            icon: Package,
            href: '/admin/products',
            submenu: [
                { title: 'Все товары', href: '/admin/products' },
                { title: 'Добавить товар', href: '/admin/products/new' },
            ],
        },
        {
            title: 'Категории',
            icon: Tag,
            href: '/admin/categories',
        },
        {
            title: 'Заказы',
            icon: ShoppingBag,
            href: '/admin/orders',
        },
        {
            title: 'Пользователи',
            icon: Users,
            href: '/admin/users',
        },
        {
            title: 'Настройки',
            icon: Settings,
            href: '/admin/settings',
        },
    ]

    const isActive = (href: string) => {
        if (href === '/admin') {
            return pathname === '/admin'
        }
        return pathname.startsWith(href)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            {/* Mobile menu button */}
            <button
                onClick={toggleMobileMenu}
                className="fixed left-4 top-4 z-50 rounded-md bg-gray-800 p-2 text-white md:hidden"
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-800 text-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
                    isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex h-16 items-center justify-center border-b border-gray-700">
                        <h1 className="text-xl font-bold">СтройМаркет Админ</h1>
                    </div>

                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-1">
                            {menuItems.map((item) => (
                                <li key={item.href} className="mb-2">
                                    {item.submenu ? (
                                        <div className="mb-1">
                                            <div
                                                className={`flex cursor-pointer items-center rounded-md px-4 py-2 ${
                                                    isActive(item.href)
                                                        ? 'bg-gray-700 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                }`}
                                            >
                                                <item.icon className="mr-3 h-5 w-5" />
                                                <span className="flex-1">{item.title}</span>
                                                <ChevronDown className="h-4 w-4" />
                                            </div>
                                            <ul className="ml-6 mt-1 space-y-1">
                                                {item.submenu.map((subitem) => (
                                                    <li key={subitem.href}>
                                                        <Link
                                                            href={subitem.href}
                                                            className={`block rounded-md px-4 py-2 ${
                                                                pathname === subitem.href
                                                                    ? 'bg-gray-700 text-white'
                                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                            }`}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                        >
                                                            {subitem.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className={`flex items-center rounded-md px-4 py-2 ${
                                                isActive(item.href)
                                                    ? 'bg-gray-700 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <item.icon className="mr-3 h-5 w-5" />
                                            <span>{item.title}</span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="border-t border-gray-700 p-4">
                        <button
                            onClick={() => router.push('/')}
                            className="flex w-full items-center rounded-md px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            <span>На главную</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    )
}
