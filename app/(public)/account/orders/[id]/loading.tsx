import { Skeleton } from '@/components/ui/skeleton'

export default function OrderDetailLoading() {
    return (
        <div className="space-y-8">
            <div className="flex items-center">
                <Skeleton className="mr-4 h-5 w-5" />
                <Skeleton className="h-10 w-64" />
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="md:col-span-2">
                    {/* Статус заказа */}
                    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
                        <div className="flex items-start">
                            <Skeleton className="mr-4 h-12 w-12 rounded-full" />
                            <div className="w-full">
                                <div className="flex items-center">
                                    <Skeleton className="mr-2 h-6 w-24 rounded-full" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                                <Skeleton className="mt-2 h-4 w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Товары в заказе */}
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <Skeleton className="mb-4 h-8 w-48" />

                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex border-b pb-4">
                                    <Skeleton className="mr-4 h-20 w-20 rounded-md" />
                                    <div className="flex w-full flex-col">
                                        <Skeleton className="h-6 w-3/4" />
                                        <div className="mt-auto flex w-full items-end justify-between">
                                            <Skeleton className="h-4 w-24" />
                                            <Skeleton className="h-6 w-20" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 space-y-2 border-t pt-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-4 w-20" />
                                </div>
                            ))}

                            <div className="flex justify-between border-t pt-2">
                                <Skeleton className="h-6 w-16" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-1">
                    {/* Информация о доставке */}
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <Skeleton className="mb-4 h-8 w-48" />

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center">
                                    <Skeleton className="mr-2 h-5 w-5" />
                                    <Skeleton className="h-6 w-32" />
                                </div>
                                <Skeleton className="mt-1 h-4 w-full" />
                            </div>

                            <div>
                                <div className="flex items-center">
                                    <Skeleton className="mr-2 h-5 w-5" />
                                    <Skeleton className="h-6 w-32" />
                                </div>
                                <Skeleton className="mt-1 h-4 w-full" />
                                <Skeleton className="mt-1 h-4 w-1/2" />
                            </div>
                        </div>
                    </div>

                    {/* Информация об оплате */}
                    <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
                        <Skeleton className="mb-4 h-8 w-48" />

                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center">
                                    <Skeleton className="mr-2 h-5 w-5" />
                                    <Skeleton className="h-6 w-32" />
                                </div>
                                <Skeleton className="mt-1 h-4 w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
