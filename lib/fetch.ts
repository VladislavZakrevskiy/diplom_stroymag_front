import { API_URL, NODE_ENV } from '@/env'

export const $fetch = (input: string, init?: RequestInit) =>
    fetch(API_URL + input, { cache: NODE_ENV === 'production' ? undefined : 'no-cache' })
