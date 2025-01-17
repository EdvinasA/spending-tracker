import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/signup', '/home', '/']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookieStore = await cookies();
    cookieStore.set('email', process.env.NEXT_PUBLIC_DEFAULT_EMAIL!);
    // if (isProtectedRoute && !session?.userId) {
    //     return NextResponse.redirect(new URL('/login', req.nextUrl))
    // }

    // if (
    //     isPublicRoute
    // ) {
    //     return NextResponse.redirect(new URL(path, req.nextUrl))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}