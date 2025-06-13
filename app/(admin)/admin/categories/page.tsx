import { cookies } from 'next/headers'
import Link from 'next/link'
import { getAdminCategories } from '@/lib/api/admin'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default async function AdminCategoriesPage() {
    const refreshToken = cookies().get('refreshToken')?.value
    const accessToken = cookies().get('accessToken')?.value

    if (!refreshToken || !accessToken) {
        return null
    }

    const categories = await getAdminCategories(accessToken)

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Управление категориями</h1>
                <Link href="/admin/categories/new" className="btn-primary flex items-center">
                    <Plus className="mr-2 h-5 w-5" />
                    Добавить категорию
                </Link>
            </div>

            <div className="rounded-lg bg-white shadow-md">
                {categories.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="p-4 font-medium">Название</th>
                                    <th className="p-4 font-medium">Кол-во товаров</th>
                                    <th className="p-4 font-medium">Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-medium">{category.name}</td>
                                        <td className="p-4">{category._count.products}</td>
                                        <td className="p-4">
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={`/admin/categories/${category.id}`}
                                                    className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <p className="text-gray-500">Нет категорий для отображения</p>
                    </div>
                )}
            </div>
        </div>
    )
}
