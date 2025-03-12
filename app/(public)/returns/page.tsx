import type React from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, Package, RefreshCw, Truck, CheckCircle, HelpCircle } from 'lucide-react'

export const metadata = {
    title: 'Возврат товара - СтройМаркет',
    description: 'Информация о правилах и процедуре возврата товаров в СтройМаркет',
}

export default function ReturnsPage() {
    return (
        <div className="space-y-12">
            <section>
                <h1 className="mb-6 text-3xl font-bold">Возврат товара</h1>

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <p className="mb-4 text-lg">
                        Компания СтройМаркет стремится обеспечить высокое качество обслуживания и товаров. Если вам
                        необходимо вернуть товар, мы постараемся сделать этот процесс максимально простым и удобным.
                    </p>

                    <div className="mb-6 rounded-lg bg-blue-50 p-4 text-blue-800">
                        <p className="flex items-start">
                            <InfoIcon className="mr-2 mt-1 flex-shrink-0" size={20} />
                            <span>
                                В соответствии с Законом РФ «О защите прав потребителей», вы имеете право вернуть товар
                                надлежащего качества в течение 14 дней с момента покупки, если он не был в употреблении,
                                сохранены его товарный вид, потребительские свойства, пломбы, фабричные ярлыки и
                                документ, подтверждающий факт покупки.
                            </span>
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-bold">Процесс возврата товара</h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {[
                        {
                            icon: FileText,
                            title: 'Заполните заявление',
                            description:
                                'Заполните заявление на возврат товара в магазине или скачайте форму с нашего сайта',
                        },
                        {
                            icon: Package,
                            title: 'Подготовьте товар',
                            description: 'Упакуйте товар в оригинальную упаковку со всеми комплектующими и документами',
                        },
                        {
                            icon: Truck,
                            title: 'Верните товар',
                            description:
                                'Принесите товар в любой магазин СтройМаркет или воспользуйтесь услугой возврата через курьера',
                        },
                    ].map((step, index) => (
                        <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 text-white">
                                <step.icon size={24} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                            <p className="text-gray-700">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
                    <h3 className="mb-4 text-xl font-bold">Документы для возврата</h3>
                    <ul className="list-inside list-disc space-y-2 text-gray-700">
                        <li>Документ, удостоверяющий личность (паспорт)</li>
                        <li>Документ, подтверждающий покупку (чек, квитанция, выписка с банковского счета)</li>
                        <li>Заявление на возврат товара (можно заполнить в магазине)</li>
                        <li>Банковские реквизиты для возврата денежных средств (при безналичной оплате)</li>
                    </ul>

                    <div className="mt-6">
                        <Link
                            href="/documents/return-form.pdf"
                            className="flex items-center text-gray-800 hover:underline"
                            target="_blank"
                        >
                            <FileText size={20} className="mr-2" />
                            Скачать бланк заявления на возврат товара
                        </Link>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-bold">Условия возврата</h2>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h3 className="mb-4 text-xl font-bold">Товар надлежащего качества</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-green-600" />
                                <span>Возврат в течение 14 дней с момента покупки</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-green-600" />
                                <span>Товар не был в употреблении</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-green-600" />
                                <span>Сохранены товарный вид, потребительские свойства, пломбы, ярлыки</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-green-600" />
                                <span>Сохранен документ, подтверждающий факт покупки</span>
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h3 className="mb-4 text-xl font-bold">Товар ненадлежащего качества</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start">
                                <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-green-600" />
                                <span>Возврат в течение гарантийного срока</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-green-600" />
                                <span>Наличие дефектов, не оговоренных продавцом</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-green-600" />
                                <span>Товар не соответствует заявленным характеристикам</span>
                            </li>
                            <li className="flex items-start">
                                <CheckCircle size={20} className="mr-2 mt-1 flex-shrink-0 text-green-600" />
                                <span>Возможна экспертиза товара (до 20 дней)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-bold">Товары, не подлежащие возврату</h2>

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <p className="mb-4">
                        В соответствии с Постановлением Правительства РФ от 31.12.2020 N 2463, следующие товары не
                        подлежат возврату или обмену:
                    </p>

                    <ul className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <li className="flex items-center">
                            <ArrowLeft size={16} className="mr-2 text-red-600" />
                            <span>Строительные и отделочные материалы, отпускаемые на метраж</span>
                        </li>
                        <li className="flex items-center">
                            <ArrowLeft size={16} className="mr-2 text-red-600" />
                            <span>Товары для профилактики и лечения заболеваний в домашних условиях</span>
                        </li>
                        <li className="flex items-center">
                            <ArrowLeft size={16} className="mr-2 text-red-600" />
                            <span>Предметы личной гигиены</span>
                        </li>
                        <li className="flex items-center">
                            <ArrowLeft size={16} className="mr-2 text-red-600" />
                            <span>Парфюмерно-косметические товары</span>
                        </li>
                        <li className="flex items-center">
                            <ArrowLeft size={16} className="mr-2 text-red-600" />
                            <span>Текстильные товары, отпускаемые на метраж</span>
                        </li>
                        <li className="flex items-center">
                            <ArrowLeft size={16} className="mr-2 text-red-600" />
                            <span>Швейные и трикотажные изделия (бельевые, чулочно-носочные)</span>
                        </li>
                        <li className="flex items-center">
                            <ArrowLeft size={16} className="mr-2 text-red-600" />
                            <span>
                                Изделия и материалы, контактирующие с пищевыми продуктами, из полимерных материалов
                            </span>
                        </li>
                        <li className="flex items-center">
                            <ArrowLeft size={16} className="mr-2 text-red-600" />
                            <span>Товары бытовой химии, пестициды и агрохимикаты</span>
                        </li>
                    </ul>
                </div>
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-bold">Часто задаваемые вопросы</h2>

                <div className="space-y-4">
                    {[
                        {
                            question: 'Как быстро я получу деньги за возвращенный товар?',
                            answer: 'При возврате товара надлежащего качества деньги возвращаются в течение 10 дней с момента предъявления требования. При возврате товара ненадлежащего качества — в течение 10 дней с момента предъявления требования или окончания проверки качества товара.',
                        },
                        {
                            question: 'Могу ли я вернуть товар без чека?',
                            answer: 'Да, отсутствие чека не является основанием для отказа в возврате товара. Вы можете подтвердить факт покупки другими способами: свидетельскими показаниями, выпиской с банковского счета, гарантийным талоном и т.д.',
                        },
                        {
                            question: 'Можно ли вернуть товар, купленный со скидкой?',
                            answer: 'Да, товар, приобретенный со скидкой, подлежит возврату на общих основаниях. Исключение составляют товары со скидкой по причине наличия недостатка, о котором вы были предупреждены при покупке.',
                        },
                        {
                            question: 'Как вернуть товар, купленный онлайн?',
                            answer: 'Для возврата товара, купленного в интернет-магазине, вы можете обратиться в любой розничный магазин СтройМаркет или оформить возврат через службу доставки. Срок возврата товара надлежащего качества, купленного дистанционно, составляет 7 дней с момента получения.',
                        },
                    ].map((faq, index) => (
                        <div key={index} className="rounded-lg bg-white p-6 shadow-md">
                            <h3 className="mb-3 flex items-center text-lg font-bold">
                                <HelpCircle size={20} className="mr-2 text-gray-800" />
                                {faq.question}
                            </h3>
                            <p className="text-gray-700">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-lg bg-gray-50 p-8">
                <div className="flex flex-col items-center text-center md:flex-row md:items-start md:text-left">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-white md:mb-0 md:mr-6">
                        <RefreshCw size={32} />
                    </div>
                    <div>
                        <h2 className="mb-4 text-2xl font-bold">Нужна помощь с возвратом?</h2>
                        <p className="mb-6 text-gray-700">
                            Если у вас остались вопросы по возврату товара или вам требуется консультация, наши
                            специалисты всегда готовы помочь. Свяжитесь с нами любым удобным способом.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                            <Link href="/contacts" className="btn-primary">
                                Связаться с нами
                            </Link>
                            <a href="tel:+74951234567" className="btn-outline">
                                +7 (495) 123-45-67
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

function InfoIcon(props: React.ComponentProps<typeof HelpCircle>) {
    return <HelpCircle {...props} />
}
