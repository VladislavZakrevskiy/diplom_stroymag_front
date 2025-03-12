import { cookies } from 'next/headers'
import CategoryForm from '@/components/admin/CategoryForm'

export default async function NewCategoryPage() {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        return null
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Добавить новую категорию</h1>

            <CategoryForm />
        </div>
    )
}
