'use client'

import React, { FC, useState } from 'react'
import CheckoutForm from './CheckoutForm'
import OrderSummaryClient from './OrderSummaryClient'
import { Address } from '@/lib/api/addresses'

interface DeliveryFormProps {
    addresses: Address[]
}

export const DeliveryForm: FC<DeliveryFormProps> = ({ addresses }) => {
    const [deliveryCost, setDeliveryCost] = useState(500)

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Оформление заказа</h1>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <CheckoutForm addresses={addresses} setDeliveryCost={setDeliveryCost} />
                </div>

                <div className="lg:col-span-1">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h2 className="mb-4 text-xl font-bold">Ваш заказ</h2>
                        <OrderSummaryClient deliveryCost={deliveryCost} />
                    </div>
                </div>
            </div>
        </div>
    )
}
