import Link from 'next/link'
import Image from 'next/image'
import { getCategories } from '@/lib/api/categories'

export default async function CategoryList() {
    const categories = await getCategories()

    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {categories.map((category) => (
                <Link key={category.id} href={`/products?category=${category.id}`} className="group">
                    <div className="overflow-hidden rounded-lg bg-gray-100">
                        <div className="relative aspect-square">
                            <Image
                                src={`/${
                                    category.image || 'placeholder.svg'
                                }?height=200&width=200&text=${encodeURIComponent(category.name)}`}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                        </div>
                    </div>
                    <div className="mt-2 text-center">
                        <h3 className="font-medium">{category.name}</h3>
                        <p className="text-sm text-gray-500">{category._count.products} товаров</p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
