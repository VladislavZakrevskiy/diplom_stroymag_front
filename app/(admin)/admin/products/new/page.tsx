import { cookies } from 'next/headers'
import { getCategories } from '@/lib/api/categories'
import ProductForm from '@/components/admin/ProductForm'

export default async function NewProductPage() {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        return null
    }

    const categories = await getCategories()

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Добавить новый товар</h1>

            <ProductForm categories={categories} />
        </div>
    )
}
