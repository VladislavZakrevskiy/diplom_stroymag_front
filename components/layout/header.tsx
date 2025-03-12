'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { useCart } from '@/context/cart-context'
import MobileMenu from './mobile-menu'
import SearchBar from '../ui/search-bar'
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react'

export default function Header() {
    const pathname = usePathname()
    const { isAuthenticated, isAdmin } = useAuth()
    const { cart } = useCart()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 0)
            }

            window.addEventListener('scroll', handleScroll)
            return () => window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen)
    }

    return (
        <header className={`sticky top-0 z-50 bg-white transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-800">
                            СтройМаркет
                        </Link>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <Link
                            href="/products"
                            className={`text-gray-600 hover:text-gray-800 ${
                                pathname.startsWith('/products') ? 'font-medium' : ''
                            }`}
                        >
                            Каталог
                        </Link>
                        <Link
                            href="/products?isSale=true"
                            className={`text-gray-600 hover:text-gray-800 ${
                                pathname.startsWith('/promotions') ? 'font-medium' : ''
                            }`}
                        >
                            Акции
                        </Link>
                        <Link
                            href="/delivery"
                            className={`text-gray-600 hover:text-gray-800 ${
                                pathname.startsWith('/delivery') ? 'font-medium' : ''
                            }`}
                        >
                            Доставка
                        </Link>
                        <Link
                            href="/contacts"
                            className={`text-gray-600 hover:text-gray-800 ${
                                pathname.startsWith('/contacts') ? 'font-medium' : ''
                            }`}
                        >
                            Контакты
                        </Link>
                        {isAdmin && (
                            <Link
                                className={`text-gray-600 hover:text-gray-800 ${
                                    pathname.startsWith('/admin') ? 'font-medium' : ''
                                }`}
                                href={'/admin'}
                            >
                                Админ Панель
                            </Link>
                        )}
                    </nav>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleSearch}
                            className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
                            aria-label="Поиск"
                        >
                            <Search size={20} />
                        </button>

                        <Link
                            href="/cart"
                            className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 relative"
                            aria-label="Корзина"
                        >
                            <ShoppingCart size={20} />
                            {cart && cart?.items?.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cart.items.reduce((a, b) => (a += b.quantity), 0)}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <Link
                                href="/account"
                                className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100"
                                aria-label="Личный кабинет"
                            >
                                <User size={20} />
                            </Link>
                        ) : (
                            <Link href="/auth/login" className="text-gray-600 hover:text-gray-800">
                                Войти
                            </Link>
                        )}

                        <button
                            onClick={toggleMobileMenu}
                            className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 md:hidden"
                            aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {isSearchOpen && (
                    <div className="py-4 border-t">
                        <SearchBar onClose={toggleSearch} />
                    </div>
                )}
            </div>

            {isMobileMenuOpen && <MobileMenu onClose={toggleMobileMenu} />}
        </header>
    )
}
