import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Instagram, YoutubeIcon as YouTube } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">СтройМаркет</h3>
                        <p className="text-gray-300 mb-4">Широкий выбор строительных материалов по доступным ценам</p>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-300 hover:text-white"
                                aria-label="YouTube"
                            >
                                <YouTube size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Информация</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-white">
                                    О компании
                                </Link>
                            </li>
                            <li>
                                <Link href="/delivery" className="text-gray-300 hover:text-white">
                                    Доставка и оплата
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-gray-300 hover:text-white">
                                    Возврат товара
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Каталог</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/products?category=building-materials"
                                    className="text-gray-300 hover:text-white"
                                >
                                    Стройматериалы
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=tools" className="text-gray-300 hover:text-white">
                                    Инструменты
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=plumbing" className="text-gray-300 hover:text-white">
                                    Сантехника
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=electrical" className="text-gray-300 hover:text-white">
                                    Электротовары
                                </Link>
                            </li>
                            <li>
                                <Link href="/products?category=paints" className="text-gray-300 hover:text-white">
                                    Краски и отделка
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Контакты</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                                <span className="text-gray-300">г. Москва, ул. Строителей, д. 10</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="mr-2 flex-shrink-0" />
                                <a href="tel:+74951234567" className="text-gray-300 hover:text-white">
                                    +7 (495) 123-45-67
                                </a>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="mr-2 flex-shrink-0" />
                                <a href="mailto:info@stroymarket.ru" className="text-gray-300 hover:text-white">
                                    info@stroymarket.ru
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300 text-sm">
                    <p>&copy; {new Date().getFullYear()} СтройМаркет. Все права защищены.</p>
                </div>
            </div>
        </footer>
    )
}
