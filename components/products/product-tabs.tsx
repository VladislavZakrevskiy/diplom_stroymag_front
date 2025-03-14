'use client'

import { useState } from 'react'
import type { Product } from '@/types/product'

interface ProductTabsProps {
    product: Product
}

export default function ProductTabs({ product }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState('description')

    return (
        <div>
            <div className="border-b">
                <nav className="flex -mb-px">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`py-4 px-6 font-medium text-sm border-b-2 ${
                            activeTab === 'description'
                                ? 'border-gray-800 text-gray-800'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Описание
                    </button>
                </nav>
            </div>

            <div className="py-6">
                {activeTab === 'description' && (
                    <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                )}
            </div>
        </div>
    )
}
