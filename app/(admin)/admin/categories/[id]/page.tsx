import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { getCategoryById } from '@/lib/api/categories'
import CategoryForm from '@/components/admin/CategoryForm'

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        return null
    }
    const category = await getCategoryById(params.id)

    if (!category) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Редактировать категорию</h1>

            <CategoryForm category={category} />
        </div>
    )
}
