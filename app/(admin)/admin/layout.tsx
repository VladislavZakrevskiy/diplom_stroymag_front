import type React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { getUserProfile } from '@/lib/api/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        redirect('/auth/login?redirect=/admin')
    }

    const user = await getUserProfile(accessToken)

    if (!user || user.role !== 'ADMIN') {
        redirect('/')
    }

    return (
        <div className="flex min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-8">{children}</main>
        </div>
    )
}
