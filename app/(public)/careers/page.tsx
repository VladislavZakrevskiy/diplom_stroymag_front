import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import JobCard from '@/components/careers/job-card'
import BenefitsSection from '@/components/careers/benefits-section'
import ApplicationProcess from '@/components/careers/application-process'
import ContactForm from '@/components/careers/contact-form'

export const metadata = {
    title: 'Вакансии - СтройМаркет',
    description: 'Присоединяйтесь к команде СтройМаркет. Актуальные вакансии и карьерные возможности в нашей компании.',
}

// Список вакансий (в реальном приложении будет загружаться из API)
const jobs = [
    {
        id: '1',
        title: 'Менеджер по продажам',
        department: 'Отдел продаж',
        location: 'Ростов-на-Дону',
        type: 'Полная занятость',
        description: 'Консультирование клиентов по ассортименту, оформление заказов, работа с клиентской базой.',
        requirements: [
            'Опыт работы в продажах от 1 года',
            'Знание строительных материалов',
            'Уверенный пользователь ПК',
            'Коммуникабельность и клиентоориентированность',
        ],
        salary: 'от 60 000 ₽',
    },
    {
        id: '2',
        title: 'Кладовщик',
        department: 'Склад',
        location: 'Ростов-на-Дону',
        type: 'Полная занятость',
        description: 'Приемка, хранение и отпуск товарно-материальных ценностей, проведение инвентаризаций.',
        requirements: [
            'Опыт работы на складе от 1 года',
            'Знание складского учета',
            'Внимательность и ответственность',
            'Готовность к физическим нагрузкам',
        ],
        salary: 'от 45 000 ₽',
    },
    {
        id: '3',
        title: 'Водитель-экспедитор',
        department: 'Логистика',
        location: 'Ростов-на-Дону',
        type: 'Полная занятость',
        description: 'Доставка строительных материалов клиентам, работа с сопроводительной документацией.',
        requirements: [
            'Водительские права категории B, C',
            'Опыт вождения от 3 лет',
            'Знание Москвы и области',
            'Ответственность и пунктуальность',
        ],
        salary: 'от 65 000 ₽',
    },
    {
        id: '4',
        title: 'Специалист по интернет-маркетингу',
        department: 'Маркетинг',
        location: 'Ростов-на-Дону',
        type: 'Полная занятость',
        description: 'Продвижение интернет-магазина, работа с контекстной рекламой, SEO-оптимизация, аналитика.',
        requirements: [
            'Опыт работы в интернет-маркетинге от 2 лет',
            'Знание Яндекс.Директ, Google Ads',
            'Понимание основ SEO',
            'Аналитический склад ума',
        ],
        salary: 'от 70 000 ₽',
    },
    {
        id: '5',
        title: 'Менеджер по закупкам',
        department: 'Закупки',
        location: 'Ростов-на-Дону',
        type: 'Полная занятость',
        description: 'Поиск поставщиков, ведение переговоров, заключение договоров, контроль поставок.',
        requirements: [
            'Опыт работы в закупках от 2 лет',
            'Знание рынка строительных материалов',
            'Навыки ведения переговоров',
            'Аналитические способности',
        ],
        salary: 'от 80 000 ₽',
    },
]

export default function CareersPage() {
    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-900/80 to-gray-900/60" />

                <div className="relative aspect-[2.5/1] w-full">
                    <Image
                        src="/карьера.jpeg?height=600&width=1500&text=Карьера+в+СтройМаркет"
                        alt="Карьера в СтройМаркет"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="absolute inset-0 z-20 flex items-center">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl text-white">
                            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">Карьера в СтройМаркет</h1>
                            <p className="mb-6 text-lg">
                                Присоединяйтесь к нашей команде профессионалов и развивайтесь вместе с нами. Мы
                                предлагаем стабильную работу, конкурентную зарплату и возможности для роста.
                            </p>
                            <a href="#vacancies" className="btn-primary inline-flex items-center">
                                Смотреть вакансии
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Company Section */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    <div>
                        <h2 className="mb-6 text-3xl font-bold">О компании</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>
                                <strong>СтройМаркет</strong> — это динамично развивающаяся компания на рынке
                                строительных материалов. С 2005 года мы обеспечиваем клиентов качественными
                                строительными материалами и инструментами.
                            </p>
                            <p>
                                Наша команда — это более 200 профессионалов, объединенных общей целью: предоставлять
                                клиентам лучший сервис и качественные товары по доступным ценам.
                            </p>
                            <p>
                                Мы ценим в сотрудниках профессионализм, ответственность, инициативность и стремление к
                                развитию. Если вы разделяете наши ценности и хотите стать частью успешной команды —
                                присоединяйтесь к нам!
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-800">5+</div>
                                <div className="text-sm text-gray-600">Городов присутствия</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-800">200+</div>
                                <div className="text-sm text-gray-600">Сотрудников</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-800">18</div>
                                <div className="text-sm text-gray-600">Лет на рынке</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-800">15+</div>
                                <div className="text-sm text-gray-600">Тыс. м² площадь</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-square overflow-hidden rounded-xl md:aspect-auto">
                        <Image
                            src="/стройка.jpeg?height=600&width=600&text=Наша+команда"
                            alt="Команда СтройМаркет"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <BenefitsSection />

            {/* Vacancies Section */}
            <section id="vacancies" className="container mx-auto px-4">
                <h2 className="mb-10 text-center text-3xl font-bold">Актуальные вакансии</h2>

                <div className="space-y-6">
                    {jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <p className="mb-4 text-gray-600">
                        Не нашли подходящую вакансию? Отправьте нам своё резюме, и мы свяжемся с вами, когда появится
                        подходящая позиция.
                    </p>
                    <a href="#contact" className="btn-outline inline-block">
                        Отправить резюме
                    </a>
                </div>
            </section>

            {/* Application Process */}
            <ApplicationProcess />

            {/* Contact Form */}
            <section id="contact" className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl">
                    <h2 className="mb-10 text-center text-3xl font-bold">Отправить резюме</h2>
                    <ContactForm />
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-10 text-center text-3xl font-bold">Часто задаваемые вопросы</h2>

                    <div className="mx-auto max-w-3xl space-y-6">
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h3 className="mb-3 text-xl font-bold">Как проходит собеседование?</h3>
                            <p className="text-gray-700">
                                Процесс собеседования обычно включает в себя телефонное интервью с HR-специалистом,
                                затем очную встречу с руководителем отдела. Для некоторых позиций может потребоваться
                                выполнение тестового задания.
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h3 className="mb-3 text-xl font-bold">Какие условия работы?</h3>
                            <p className="text-gray-700">
                                Мы предлагаем официальное трудоустройство по ТК РФ, конкурентную заработную плату,
                                социальный пакет, включающий ДМС после испытательного срока, корпоративное обучение и
                                возможности для профессионального роста.
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h3 className="mb-3 text-xl font-bold">Есть ли у вас программа стажировок?</h3>
                            <p className="text-gray-700">
                                Да, мы регулярно проводим стажировки для студентов и выпускников. Лучшие стажеры
                                получают предложение о постоянной работе. Информацию о текущих стажировках вы можете
                                узнать, связавшись с нашим HR-отделом.
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h3 className="mb-3 text-xl font-bold">Как долго рассматривается резюме?</h3>
                            <p className="text-gray-700">
                                Мы стараемся рассмотреть все резюме в течение 5-7 рабочих дней. Если ваш опыт и навыки
                                соответствуют требованиям вакансии, с вами свяжется наш HR-специалист для проведения
                                телефонного интервью.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
