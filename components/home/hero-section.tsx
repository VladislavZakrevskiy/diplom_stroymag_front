import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-xl">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-900/70 to-gray-900/30" />

      <div className="relative aspect-[2.5/1] w-full">
        <Image
          src="/placeholder.svg?height=600&width=1500"
          alt="Строительные материалы"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-lg text-white">
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Строительные материалы для любых задач
            </h1>
            <p className="mb-6 text-lg">Широкий ассортимент качественных строительных материалов по доступным ценам</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">
                Перейти в каталог
              </Link>
              <Link href="/promotions" className="btn-outline bg-white/10 text-white hover:bg-white/20">
                Акции и скидки
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

