'use client'

import { useState, useEffect } from 'react'
import { MapPin, Calculator } from 'lucide-react'
import L from 'leaflet'

// Add Leaflet type declaration
declare global {
    interface Window {
        L: any
    }
}

function DeliveryCalculator() {
    const [distance, setDistance] = useState(5)
    const [weight, setWeight] = useState(100)
    const [deliveryType, setDeliveryType] = useState('standard')
    const [deliveryCost, setDeliveryCost] = useState(0)

    // Расчет стоимости доставки
    useEffect(() => {
        let baseCost = 0

        // Базовая стоимость в зависимости от типа доставки
        if (deliveryType === 'standard') {
            baseCost = 500
        } else if (deliveryType === 'express') {
            baseCost = 1000
        } else if (deliveryType === 'cargo') {
            baseCost = 1500
        }

        // Надбавка за расстояние
        const distanceCost = distance <= 5 ? 0 : (distance - 5) * 30

        // Надбавка за вес
        const weightCost = weight <= 100 ? 0 : Math.ceil((weight - 100) / 100) * 200

        // Итоговая стоимость
        const totalCost = baseCost + distanceCost + weightCost

        setDeliveryCost(totalCost)
    }, [distance, weight, deliveryType])

    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <h3 className="mb-4 text-xl font-bold">Калькулятор доставки</h3>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="delivery-type" className="mb-1 block font-medium">
                                Тип доставки
                            </label>
                            <select
                                id="delivery-type"
                                className="input"
                                value={deliveryType}
                                onChange={(e) => setDeliveryType(e.target.value)}
                            >
                                <option value="standard">Стандартная доставка</option>
                                <option value="express">Экспресс-доставка</option>
                                <option value="cargo">Грузовая доставка</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="distance" className="mb-1 block font-medium">
                                Расстояние от МКАД: {distance} км
                            </label>
                            <input
                                id="distance"
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={distance}
                                onChange={(e) => setDistance(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                            />
                            <div className="mt-1 flex justify-between text-xs text-gray-500">
                                <span>0 км</span>
                                <span>50 км</span>
                                <span>100 км</span>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="weight" className="mb-1 block font-medium">
                                Вес заказа: {weight} кг
                            </label>
                            <input
                                id="weight"
                                type="range"
                                min="10"
                                max="1000"
                                step="10"
                                value={weight}
                                onChange={(e) => setWeight(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                            />
                            <div className="mt-1 flex justify-between text-xs text-gray-500">
                                <span>10 кг</span>
                                <span>500 кг</span>
                                <span>1000 кг</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-6">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 text-white">
                        <Calculator size={32} />
                    </div>
                    <h3 className="mb-2 text-xl font-bold">Стоимость доставки</h3>
                    <div className="text-3xl font-bold text-gray-800">{deliveryCost} ₽</div>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Окончательная стоимость может быть скорректирована менеджером после оформления заказа
                    </p>
                </div>
            </div>

            <div className="mt-6 rounded-lg bg-blue-50 p-4 text-blue-800">
                <p className="flex items-start">
                    <svg
                        className="mr-2 mt-1 h-5 w-5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                    <span>
                        При заказе на сумму от 30 000 ₽ доставка в пределах МКАД осуществляется бесплатно. Для уточнения
                        стоимости доставки крупногабаритных товаров обратитесь к менеджеру.
                    </span>
                </p>
            </div>
        </div>
    )
}

// Клиентский компонент для выбора дополнительных услуг
function DeliveryServices() {
    const [services, setServices] = useState({
        lifting: false,
        assembly: false,
        installation: false,
        disposal: false,
    })

    const [totalCost, setTotalCost] = useState(0)

    const servicesList = [
        {
            id: 'lifting',
            name: 'Подъем на этаж',
            description: 'Подъем товаров на этаж при отсутствии лифта или для крупногабаритных товаров',
            price: 1500,
        },
        {
            id: 'assembly',
            name: 'Сборка',
            description: 'Профессиональная сборка мебели и конструкций',
            price: 2000,
        },
        {
            id: 'installation',
            name: 'Монтаж',
            description: 'Установка и монтаж приобретенных товаров',
            price: 3000,
        },
        {
            id: 'disposal',
            name: 'Вывоз мусора',
            description: 'Вывоз упаковки и строительного мусора',
            price: 1000,
        },
    ]

    // Расчет общей стоимости услуг
    useEffect(() => {
        let cost = 0

        if (services.lifting) cost += 1500
        if (services.assembly) cost += 2000
        if (services.installation) cost += 3000
        if (services.disposal) cost += 1000

        setTotalCost(cost)
    }, [services])

    const handleServiceChange = (serviceId: keyof typeof services) => {
        setServices((prev) => ({
            ...prev,
            [serviceId]: !prev[serviceId],
        }))
    }

    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-6 text-xl font-bold">Выберите дополнительные услуги</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {servicesList.map((service) => (
                    <div
                        key={service.id}
                        className={`cursor-pointer rounded-lg border p-4 transition-colors ${
                            services[service.id as keyof typeof services]
                                ? 'border-gray-800 bg-gray-50'
                                : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleServiceChange(service.id as keyof typeof services)}
                    >
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                id={service.id}
                                checked={services[service.id as keyof typeof services]}
                                onChange={() => {}}
                                className="mt-1 h-5 w-5 rounded border-gray-300 text-gray-800 focus:ring-gray-800"
                            />
                            <div className="ml-3">
                                <label htmlFor={service.id} className="block font-medium">
                                    {service.name} - {service.price} ₽
                                </label>
                                <p className="mt-1 text-sm text-gray-600">{service.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <span className="font-medium">Общая стоимость дополнительных услуг:</span>
                <span className="text-xl font-bold">{totalCost} ₽</span>
            </div>
        </div>
    )
}

// Replace the DeliveryMap function with this updated version that uses Leaflet instead of Yandex Maps
function DeliveryMap() {
    const [mapLoaded, setMapLoaded] = useState(false)

    useEffect(() => {
        // Load Leaflet CSS
        const loadLeafletCSS = () => {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
            link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
            link.crossOrigin = ''
            document.head.appendChild(link)
        }

        // Initialize map after Leaflet script is loaded
        const initMap = () => {
            if (!document.getElementById('delivery-map')) return

            // Create map instance
            const map = L.map('delivery-map').setView([55.76, 37.64], 9)

            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map)

            // Add MKAD circle (inner circle)
            L.circle([55.76, 37.64], {
                color: '#81c784',
                fillColor: '#81c784',
                fillOpacity: 0.4,
                radius: 17000,
            })
                .addTo(map)
                .bindPopup('Доставка внутри МКАД')

            // Add Moscow region circle (outer circle)
            L.circle([55.76, 37.64], {
                color: '#64b5f6',
                fillColor: '#64b5f6',
                fillOpacity: 0.4,
                radius: 60000,
            })
                .addTo(map)
                .bindPopup('Доставка по Московской области')

            // Add marker for the store
            L.marker([55.76, 37.64]).addTo(map).bindPopup('СтройМаркет Центральный').openPopup()

            setMapLoaded(true)
        }

        // Load Leaflet script
        const loadLeafletScript = () => {
            loadLeafletCSS()

            const script = document.createElement('script')
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
            script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
            script.crossOrigin = ''
            script.async = true

            script.onload = () => {
                initMap()
            }

            document.body.appendChild(script)
        }

        loadLeafletScript()

        return () => {
            // Cleanup when component unmounts
            const leafletScript = document.querySelector('script[src*="leaflet"]')
            const leafletCSS = document.querySelector('link[href*="leaflet"]')

            if (leafletScript) {
                document.body.removeChild(leafletScript)
            }

            if (leafletCSS) {
                document.head.removeChild(leafletCSS)
            }
        }
    }, [])

    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center">
                <MapPin size={24} className="mr-2 text-gray-800" />
                <h3 className="text-xl font-bold">Карта зон доставки</h3>
            </div>

            <div
                id="delivery-map"
                className="h-[400px] w-full rounded-lg border"
                style={{ background: mapLoaded ? 'transparent' : '#f3f4f6' }}
            >
                {!mapLoaded && (
                    <div className="flex h-full items-center justify-center">
                        <div className="flex flex-col items-center">
                            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-800"></div>
                            <span>Загрузка карты...</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <div className="rounded-lg bg-green-50 p-3">
                    <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-[#81c784]"></div>
                        <span className="font-medium">В пределах МКАД</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">Доставка от 500 ₽</p>
                </div>

                <div className="rounded-lg bg-blue-50 p-3">
                    <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-[#64b5f6]"></div>
                        <span className="font-medium">Московская область</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">Доставка от 800 ₽ (зависит от расстояния)</p>
                </div>

                <div className="rounded-lg bg-yellow-50 p-3">
                    <div className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full bg-[#ffd54f]"></div>
                        <span className="font-medium">За пределами области</span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">Доставка рассчитывается индивидуально</p>
                </div>
            </div>
        </div>
    )
}

export default function DeliveryClientPage() {
    return (
        <div className="space-y-12">
            <section>
                <h1 className="mb-6 text-3xl font-bold">Доставка</h1>

                <div className="rounded-lg bg-white p-6 shadow-md">
                    <p className="mb-4 text-lg">
                        Компания СтройМаркет предлагает различные варианты доставки строительных материалов по Москве и
                        Московской области. Мы стремимся сделать процесс получения товаров максимально удобным и быстрым
                        для наших клиентов.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-bold">Варианты доставки</h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[
                        {
                            title: 'Стандартная доставка',
                            description: 'Доставка в течение 1-2 рабочих дней в удобное для вас время',
                            price: 'от 500 ₽',
                            features: [
                                'Доставка до подъезда',
                                'Предварительный звонок курьера',
                                'Возможность выбора временного интервала',
                            ],
                        },
                        {
                            title: 'Экспресс-доставка',
                            description: 'Доставка в день заказа или на следующий день',
                            price: 'от 1000 ₽',
                            features: [
                                'Доставка в течение 3-6 часов',
                                'Доставка до подъезда',
                                'Приоритетная обработка заказа',
                            ],
                        },
                        {
                            title: 'Грузовая доставка',
                            description: 'Для крупногабаритных и тяжелых товаров',
                            price: 'от 1500 ₽',
                            features: [
                                'Доставка манипулятором или грузовиком',
                                'Возможность разгрузки на объекте',
                                'Подъем на этаж по договоренности',
                            ],
                        },
                    ].map((option, index) => (
                        <div
                            key={index}
                            className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <h3 className="mb-2 text-xl font-bold">{option.title}</h3>
                            <p className="mb-4 text-gray-600">{option.description}</p>
                            <div className="mb-4 text-2xl font-bold text-gray-800">{option.price}</div>
                            <ul className="space-y-2">
                                {option.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <svg
                                            className="mr-2 h-5 w-5 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            ></path>
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-bold">Расчет стоимости доставки</h2>

                <DeliveryCalculator />
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-bold">Дополнительные услуги</h2>

                <DeliveryServices />
            </section>

            <section>
                <h2 className="mb-6 text-2xl font-bold">Зона доставки</h2>

                <DeliveryMap />
            </section>

            <section className="rounded-lg bg-gray-50 p-8">
                <h2 className="mb-6 text-2xl font-bold">Условия доставки</h2>

                <div className="space-y-4">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h3 className="mb-3 text-lg font-bold">Сроки доставки</h3>
                        <p className="text-gray-700">
                            Стандартная доставка осуществляется в течение 1-2 рабочих дней с момента подтверждения
                            заказа. Экспресс-доставка возможна в день заказа при оформлении до 12:00, либо на следующий
                            день. Точное время доставки согласовывается с менеджером.
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h3 className="mb-3 text-lg font-bold">Оплата доставки</h3>
                        <p className="text-gray-700">
                            Стоимость доставки зависит от веса, объема заказа и удаленности адреса доставки. При заказе
                            на сумму от 30 000 ₽ доставка в пределах МКАД осуществляется бесплатно. Оплата доставки
                            производится вместе с оплатой заказа.
                        </p>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h3 className="mb-3 text-lg font-bold">Проверка товара при получении</h3>
                        <p className="text-gray-700">
                            При получении заказа обязательно проверьте комплектацию и внешний вид товара. В случае
                            обнаружения повреждений или несоответствий, сделайте соответствующую отметку в накладной и
                            сообщите об этом курьеру или менеджеру магазина.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    )
}
