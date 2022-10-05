import { NextRequest, NextResponse } from 'next/server';

export const config = {
    matcher: '/'
}

export function middleware(req: NextRequest) {
    const COOKIE_NAME = 'ab-test'
    const getCookie = req.cookies.get(COOKIE_NAME)
    const path = getCookie? '/' : '/login'
    const res = NextResponse.rewrite(new URL(path, req.url))
    res.cookies.set(COOKIE_NAME, 'auth')
    return res
}