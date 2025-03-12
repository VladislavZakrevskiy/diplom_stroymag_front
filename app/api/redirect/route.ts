import { WEB_URL } from '@/env'
import { NextResponse } from 'next/server'

export function GET() {
    return NextResponse.redirect(WEB_URL + '/')
}
