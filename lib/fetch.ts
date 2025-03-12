import { API_URL, NODE_ENV, WEB_URL } from '@/env'

export const $fetch = async (input: string, init?: RequestInit) => {
    const res = await fetch(API_URL + input, { ...init, cache: NODE_ENV === 'production' ? undefined : 'no-cache' })

    if (!res?.ok) {
        await fetch(WEB_URL + '/api/redirect')
    }

    return res
}
