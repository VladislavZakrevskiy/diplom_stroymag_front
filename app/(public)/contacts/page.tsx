import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata = {
    title: 'Контакты - СтройМаркет',
    description: 'Контактная информация компании СтройМаркет. Адреса магазинов, телефоны, email и время работы.',
}

export default function ContactsPage() {
    return (
        <div className="space-y-12">
            <section>
                <h1 className="mb-6 text-3xl font-bold">Контакты</h1>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <div className="mb-4 flex items-center text-gray-800">
                            <Phone className="mr-2" size={24} />
                            <h2 className="text-xl font-bold">Телефоны</h2>
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <h3 className="text-sm font-medium text-gray-500">Отдел продаж:</h3>
                                <a href="tel:+74951234567" className="text-lg hover:text-gray-600">
                                    +7 (495) 123-45-67
                                </a>
                            </li>
                            <li>
                                <h3 className="text-sm font-medium text-gray-500">Служба доставки:</h3>
                                <a href="tel:+74951234568" className="text-lg hover:text-gray-600">
                                    +7 (495) 123-45-68
                                </a>
                            </li>
                            <li>
                                <h3 className="text-sm font-medium text-gray-500">Бухгалтерия:</h3>
                                <a href="tel:+74951234569" className="text-lg hover:text-gray-600">
                                    +7 (495) 123-45-69
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <div className="mb-4 flex items-center text-gray-800">
                            <Mail className="mr-2" size={24} />
                            <h2 className="text-xl font-bold">Email</h2>
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <h3 className="text-sm font-medium text-gray-500">Общие вопросы:</h3>
                                <a href="mailto:info@stroymarket.ru" className="text-lg hover:text-gray-600">
                                    info@stroymarket.ru
                                </a>
                            </li>
                            <li>
                                <h3 className="text-sm font-medium text-gray-500">Отдел продаж:</h3>
                                <a href="mailto:sales@stroymarket.ru" className="text-lg hover:text-gray-600">
                                    sales@stroymarket.ru
                                </a>
                            </li>
                            <li>
                                <h3 className="text-sm font-medium text-gray-500">Служба поддержки:</h3>
                                <a href="mailto:support@stroymarket.ru" className="text-lg hover:text-gray-600">
                                    support@stroymarket.ru
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <div className="mb-4 flex items-center text-gray-800">
                            <Clock className="mr-2" size={24} />
                            <h2 className="text-xl font-bold">Время работы</h2>
                        </div>
                        <ul className="space-y-3">
                            <li>
                                <h3 className="text-sm font-medium text-gray-500">Магазины:</h3>
                                <p className="text-lg">Ежедневно с 8:00 до 22:00</p>
                            </li>
                            <li>
                                <h3 className="text-sm font-medium text-gray-500">Офис:</h3>
                                <p className="text-lg">Пн-Пт с 9:00 до 18:00</p>
                            </li>
                            <li>
                                <h3 className="text-sm font-medium text-gray-500">Служба доставки:</h3>
                                <p className="text-lg">Ежедневно с 9:00 до 21:00</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-bold">Наши магазины</h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {[
                        {
                            id: 1,
                            name: 'СтройМаркет Центральный',
                            address: 'г. Москва, ул. Строителей, д. 10',
                            phone: '+7 (495) 123-45-67',
                            hours: 'Ежедневно с 8:00 до 22:00',
                            image: '/placeholder.svg?height=300&width=500&text=СтройМаркет+Центральный',
                        },
                        {
                            id: 2,
                            name: 'СтройМаркет Южный',
                            address: 'г. Москва, Варшавское шоссе, д. 125',
                            phone: '+7 (495) 987-65-43',
                            hours: 'Ежедневно с 8:00 до 22:00',
                            image: '/placeholder.svg?height=300&width=500&text=СтройМаркет+Южный',
                        },
                        {
                            id: 3,
                            name: 'СтройМаркет Западный',
                            address: 'г. Москва, Можайское шоссе, д. 45',
                            phone: '+7 (495) 456-78-90',
                            hours: 'Ежедневно с 8:00 до 22:00',
                            image: '/placeholder.svg?height=300&width=500&text=СтройМаркет+Западный',
                        },
                        {
                            id: 4,
                            name: 'СтройМаркет Восточный',
                            address: 'г. Москва, Щелковское шоссе, д. 75',
                            phone: '+7 (495) 234-56-78',
                            hours: 'Ежедневно с 8:00 до 22:00',
                            image: '/placeholder.svg?height=300&width=500&text=СтройМаркет+Восточный',
                        },
                    ].map((store) => (
                        <div key={store.id} className="overflow-hidden rounded-lg bg-white shadow-md">
                            <div className="relative h-48 w-full">
                                <Image
                                    src={store.image || '/placeholder.svg'}
                                    alt={store.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="mb-3 text-xl font-bold">{store.name}</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-gray-600" />
                                        <span>{store.address}</span>
                                    </li>
                                    <li className="flex items-center">
                                        <Phone size={20} className="mr-2 flex-shrink-0 text-gray-600" />
                                        <a
                                            href={`tel:${store.phone.replace(/\D/g, '')}`}
                                            className="hover:text-gray-600"
                                        >
                                            {store.phone}
                                        </a>
                                    </li>
                                    <li className="flex items-center">
                                        <Clock size={20} className="mr-2 flex-shrink-0 text-gray-600" />
                                        <span>{store.hours}</span>
                                    </li>
                                </ul>
                                <div className="mt-4">
                                    <Link
                                        href={`https://yandex.ru/maps/?text=${encodeURIComponent(store.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-800 hover:underline"
                                    >
                                        Показать на карте
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-lg bg-white p-8 shadow-md">
                <h2 className="mb-6 text-2xl font-bold">Связаться с нами</h2>

                <form className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="mb-1 block font-medium">
                                Ваше имя
                            </label>
                            <input id="name" type="text" className="input" placeholder="Иван Иванов" required />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-1 block font-medium">
                                Email
                            </label>
                            <input id="email" type="email" className="input" placeholder="example@mail.ru" required />
                        </div>

                        <div>
                            <label htmlFor="phone" className="mb-1 block font-medium">
                                Телефон
                            </label>
                            <input id="phone" type="tel" className="input" placeholder="+7 (___) ___-__-__" />
                        </div>

                        <div>
                            <label htmlFor="subject" className="mb-1 block font-medium">
                                Тема
                            </label>
                            <select id="subject" className="input">
                                <option value="general">Общий вопрос</option>
                                <option value="order">Вопрос по заказу</option>
                                <option value="delivery">Доставка</option>
                                <option value="return">Возврат товара</option>
                                <option value="other">Другое</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="message" className="mb-1 block font-medium">
                            Сообщение
                        </label>
                        <textarea
                            id="message"
                            rows={5}
                            className="input"
                            placeholder="Введите ваше сообщение..."
                            required
                        ></textarea>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="privacy"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
                            required
                        />
                        <label htmlFor="privacy" className="ml-2 text-sm text-gray-700">
                            Я согласен на обработку персональных данных в соответствии с{' '}
                            <Link href="/privacy" className="text-gray-800 hover:underline">
                                политикой конфиденциальности
                            </Link>
                        </label>
                    </div>

                    <button type="submit" className="btn-primary">
                        Отправить сообщение
                    </button>
                </form>
            </section>

            <section className="rounded-lg bg-gray-50 p-8">
                <h2 className="mb-6 text-2xl font-bold">Реквизиты компании</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="mb-3 text-lg font-medium">ООО "СтройМаркет"</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>
                                <strong>ИНН:</strong> 7712345678
                            </li>
                            <li>
                                <strong>КПП:</strong> 771201001
                            </li>
                            <li>
                                <strong>ОГРН:</strong> 1157746123456
                            </li>
                            <li>
                                <strong>Юридический адрес:</strong> 123456, г. Москва, ул. Строителей, д. 10
                            </li>
                            <li>
                                <strong>Фактический адрес:</strong> 123456, г. Москва, ул. Строителей, д. 10
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-3 text-lg font-medium">Банковские реквизиты</h3>
                        <ul className="space-y-2 text-gray-700">
                            <li>
                                <strong>Р/с:</strong> 40702810123450000123
                            </li>
                            <li>
                                <strong>Банк:</strong> ПАО "Сбербанк России"
                            </li>
                            <li>
                                <strong>К/с:</strong> 30101810400000000225
                            </li>
                            <li>
                                <strong>БИК:</strong> 044525225
                            </li>
                            <li>
                                <strong>Генеральный директор:</strong> Петров Александр Иванович
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}
