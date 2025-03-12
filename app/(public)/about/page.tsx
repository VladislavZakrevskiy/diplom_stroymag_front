import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
    title: 'О компании - СтройМаркет',
    description: 'Информация о компании СтройМаркет, нашей истории, миссии и ценностях',
}

export default function AboutPage() {
    return (
        <div className="space-y-12">
            <section className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-900/70 to-gray-900/30" />

                <div className="relative aspect-[3/1] w-full">
                    <Image
                        src="/placeholder.svg?height=400&width=1200"
                        alt="О компании СтройМаркет"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="absolute inset-0 z-20 flex items-center">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl text-white">
                            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">О компании</h1>
                            <p className="text-lg">
                                СтройМаркет — ваш надежный партнер в мире строительных материалов с 2005 года
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div>
                        <h2 className="mb-6 text-3xl font-bold">Наша история</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                Компания СтройМаркет была основана в 2005 году группой профессионалов строительной
                                отрасли, объединенных общей идеей — создать магазин, где каждый клиент сможет найти все
                                необходимые материалы для строительства и ремонта по доступным ценам.
                            </p>
                            <p>
                                Начав с небольшого магазина площадью всего 200 м², сегодня СтройМаркет — это сеть
                                современных торговых центров в 5 городах России с общей площадью более 15 000 м² и
                                собственным автопарком для доставки товаров.
                            </p>
                            <p>
                                За 18 лет работы мы обслужили более 500 000 клиентов и поставили строительные материалы
                                для тысяч объектов — от частных домов до крупных промышленных комплексов.
                            </p>
                        </div>
                    </div>
                    <div className="relative aspect-square overflow-hidden rounded-xl md:aspect-auto">
                        <Image
                            src="/placeholder.svg?height=600&width=600&text=История+компании"
                            alt="История компании СтройМаркет"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <h2 className="mb-10 text-center text-3xl font-bold">Наша миссия и ценности</h2>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-white">
                                <span className="text-2xl font-bold">1</span>
                            </div>
                            <h3 className="mb-3 text-xl font-bold">Качество</h3>
                            <p className="text-gray-700">
                                Мы тщательно отбираем поставщиков и контролируем качество каждого товара, чтобы наши
                                клиенты получали только лучшие строительные материалы.
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-white">
                                <span className="text-2xl font-bold">2</span>
                            </div>
                            <h3 className="mb-3 text-xl font-bold">Доступность</h3>
                            <p className="text-gray-700">
                                Мы стремимся сделать качественные строительные материалы доступными для каждого,
                                предлагая оптимальное соотношение цены и качества.
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-white">
                                <span className="text-2xl font-bold">3</span>
                            </div>
                            <h3 className="mb-3 text-xl font-bold">Сервис</h3>
                            <p className="text-gray-700">
                                Мы создаем лучший клиентский опыт через профессиональные консультации, удобную доставку
                                и постоянное совершенствование наших услуг.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4">
                <h2 className="mb-10 text-center text-3xl font-bold">Наша команда</h2>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { name: 'Александр Петров', position: 'Генеральный директор' },
                        { name: 'Елена Смирнова', position: 'Коммерческий директор' },
                        { name: 'Дмитрий Иванов', position: 'Руководитель отдела логистики' },
                        { name: 'Ольга Козлова', position: 'Главный бухгалтер' },
                    ].map((person, index) => (
                        <div key={index} className="text-center">
                            <div className="mx-auto mb-4 aspect-square w-48 overflow-hidden rounded-full">
                                <Image
                                    src={`/placeholder.svg?height=200&width=200&text=${encodeURIComponent(
                                        person.name
                                    )}`}
                                    alt={person.name}
                                    width={200}
                                    height={200}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <h3 className="mb-1 text-xl font-bold">{person.name}</h3>
                            <p className="text-gray-600">{person.position}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gray-800 py-12 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-6 text-3xl font-bold">Присоединяйтесь к нам</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
                        Мы всегда в поиске талантливых и энергичных людей, готовых развиваться вместе с нами. Узнайте о
                        текущих вакансиях или свяжитесь с нашим отделом персонала.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/careers" className="btn-primary">
                            Вакансии
                        </Link>
                        <Link href="/contacts" className="btn-outline bg-transparent text-white hover:bg-white/10">
                            Связаться с нами
                        </Link>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4">
                <h2 className="mb-10 text-center text-3xl font-bold">Наши преимущества</h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            title: 'Широкий ассортимент',
                            description: 'Более 20 000 наименований товаров для строительства и ремонта',
                        },
                        {
                            title: 'Собственный автопарк',
                            description: 'Быстрая и надежная доставка в любую точку города и области',
                        },
                        {
                            title: 'Профессиональные консультации',
                            description: 'Опытные специалисты помогут с выбором материалов для вашего проекта',
                        },
                        {
                            title: 'Гарантия качества',
                            description: 'Мы работаем только с проверенными производителями и поставщиками',
                        },
                        {
                            title: 'Гибкая система скидок',
                            description: 'Специальные предложения для постоянных клиентов и оптовых покупателей',
                        },
                        {
                            title: 'Удобные способы оплаты',
                            description: 'Наличные, банковские карты, безналичный расчет, рассрочка',
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-md"
                        >
                            <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                            <p className="text-gray-700">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
