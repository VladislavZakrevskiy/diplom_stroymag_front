import type { Metadata } from 'next'
import DeliveryClientPage from './DeliveryClientPage'

export const metadata: Metadata = {
    title: 'Доставка - СтройМаркет',
    description: 'Информация о доставке товаров из магазина СтройМаркет. Расчет стоимости доставки, сроки и условия.',
}

export default function DeliveryPage() {
    return <DeliveryClientPage />
}
