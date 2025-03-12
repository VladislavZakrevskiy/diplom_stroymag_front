import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getUserProfile } from '@/lib/api/auth'
import { getUserAddresses } from '@/lib/api/addresses'
import CheckoutForm from './CheckoutForm'
import OrderSummaryClient from './OrderSummaryClient'
import { DeliveryForm } from './DeliveryForm'

export default async function CheckoutPage() {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        redirect('/auth/login?redirect=/checkout')
    }

    const user = await getUserProfile(accessToken)
    const addresses = await getUserAddresses(accessToken)

    if (!user) {
        redirect('/auth/login?redirect=/checkout')
    }

    return <DeliveryForm addresses={addresses} />
}
