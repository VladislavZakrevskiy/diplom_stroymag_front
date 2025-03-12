import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/api/products'
import { getCategories } from '@/lib/api/categories'
import ProductForm from '@/components/admin/ProductForm'

export default async function EditProductPage({ params }: { params: { id: string } }) {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        return null
    }

    const [product, categories] = await Promise.all([getProductById(params.id), getCategories()])

    if (!product) {
        notFound()
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Редактировать товар</h1>

            <ProductForm product={product} categories={categories} />
        </div>
    )
}
