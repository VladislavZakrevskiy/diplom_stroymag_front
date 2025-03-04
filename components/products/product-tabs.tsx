"use client"

import { useState } from "react"
import type { Product } from "@/types/product"

interface ProductTabsProps {
  product: Product
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <div>
      <div className="border-b">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab("description")}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === "description"
                ? "border-gray-800 text-gray-800"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Описание
          </button>
          <button
            onClick={() => setActiveTab("characteristics")}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === "characteristics"
                ? "border-gray-800 text-gray-800"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Характеристики
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === "reviews"
                ? "border-gray-800 text-gray-800"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Отзывы ({product.reviewCount})
          </button>
        </nav>
      </div>

      <div className="py-6">
        {activeTab === "description" && (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        )}

        {activeTab === "characteristics" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.characteristics.map((char) => (
              <div key={char.id} className="flex">
                <span className="w-1/2 font-medium">{char.name}:</span>
                <span className="w-1/2">{char.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex justify-between mb-2">
                    <div>
                      <span className="font-medium">{review.author}</span>
                      <span className="text-gray-500 text-sm ml-2">{new Date(review.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <p>{review.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">У этого товара пока нет отзывов. Будьте первым!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

