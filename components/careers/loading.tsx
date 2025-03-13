import { Skeleton } from "@/components/ui/skeleton"

export default function CareersLoading() {
  return (
    <div className="space-y-16">
      {/* Hero Section Skeleton */}
      <section className="relative overflow-hidden rounded-xl">
        <Skeleton className="aspect-[2.5/1] w-full" />
      </section>

      {/* About Company Section Skeleton */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div>
            <Skeleton className="mb-6 h-10 w-48" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <Skeleton className="mx-auto h-8 w-16" />
                  <Skeleton className="mx-auto mt-2 h-4 w-24" />
                </div>
              ))}
            </div>
          </div>

          <Skeleton className="aspect-square md:aspect-auto md:h-full" />
        </div>
      </section>

      {/* Benefits Section Skeleton */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="mx-auto mb-10 h-10 w-64" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg bg-white p-6 shadow-md">
                <Skeleton className="mb-4 h-12 w-12 rounded-full" />
                <Skeleton className="mb-2 h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-full" />
                <Skeleton className="mt-1 h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vacancies Section Skeleton */}
      <section className="container mx-auto px-4">
        <Skeleton className="mx-auto mb-10 h-10 w-64" />

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-7 w-48" />
                  <div className="mt-2 flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form Skeleton */}
      <section className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          <Skeleton className="mx-auto mb-10 h-10 w-48" />
          <div className="rounded-lg bg-white p-8 shadow-md">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

