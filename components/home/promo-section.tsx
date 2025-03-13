import Link from 'next/link'
import Image from 'next/image'
import { Truck, ShieldCheck, Clock, CreditCard } from 'lucide-react'

export default function PromoSection() {
    return (
        <section className="space-y-12">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-start space-x-4 rounded-lg bg-gray-50 p-6">
                    <div className="rounded-full bg-gray-800 p-3 text-white">
                        <Truck size={24} />
                    </div>
                    <div>
                        <h3 className="mb-2 font-bold">Быстрая доставка</h3>
                        <p className="text-sm text-gray-600">Доставка по городу в течение 24 часов</p>
                    </div>
                </div>

                <div className="flex items-start space-x-4 rounded-lg bg-gray-50 p-6">
                    <div className="rounded-full bg-gray-800 p-3 text-white">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h3 className="mb-2 font-bold">Гарантия качества</h3>
                        <p className="text-sm text-gray-600">Только сертифицированные материалы</p>
                    </div>
                </div>

                <div className="flex items-start space-x-4 rounded-lg bg-gray-50 p-6">
                    <div className="rounded-full bg-gray-800 p-3 text-white">
                        <Clock size={24} />
                    </div>
                    <div>
                        <h3 className="mb-2 font-bold">Работаем без выходных</h3>
                        <p className="text-sm text-gray-600">Ежедневно с 8:00 до 20:00</p>
                    </div>
                </div>

                <div className="flex items-start space-x-4 rounded-lg bg-gray-50 p-6">
                    <div className="rounded-full bg-gray-800 p-3 text-white">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <h3 className="mb-2 font-bold">Удобная оплата</h3>
                        <p className="text-sm text-gray-600">Наличные, карты, онлайн-платежи</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="group relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/70 to-red-600/30 transition-all group-hover:from-red-600/80 group-hover:to-red-600/40" />

                    <div className="relative aspect-[1.5/1] w-full">
                        <Image
                            src="/молоток.jpeg?height=400&width=600"
                            alt="Скидки на инструменты"
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    </div>

                    <div className="absolute inset-0 flex items-center p-6">
                        <div className="text-white">
                            <h3 className="mb-2 text-2xl font-bold">Скидки до 30% на инструменты</h3>
                            <p className="mb-4">Только до конца месяца специальные цены на электроинструменты</p>
                            <Link
                                href="/products?category=tools"
                                className="inline-block rounded-md bg-white px-4 py-2 font-medium text-red-600 transition-colors hover:bg-gray-100"
                            >
                                Подробнее
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-lg">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800/70 to-gray-800/30 transition-all group-hover:from-gray-800/80 group-hover:to-gray-800/40" />

                    <div className="relative aspect-[1.5/1] w-full">
                        <Image
                            src="/консультант.jpeg?height=400&width=600"
                            alt="Бесплатная консультация"
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                        />
                    </div>

                    <div className="absolute inset-0 flex items-center p-6">
                        <div className="text-white">
                            <h3 className="mb-2 text-2xl font-bold">Бесплатная консультация</h3>
                            <p className="mb-4">Наши специалисты помогут подобрать материалы для вашего проекта</p>
                            <Link
                                href="/contacts"
                                className="inline-block rounded-md bg-white px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-100"
                            >
                                Связаться
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
