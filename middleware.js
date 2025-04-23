import { NextResponse } from 'next/server';
import * as ThirdParty from "@/lib/auth";
import { decodeAndSetCookies, removeAllUserCookies } from "@/lib/server-utils";

async function tryToRefreshToken(refreshToken) {
    try {
        
        const response = await ThirdParty.RefreshToken(refreshToken);
        const accessToken = response.access;
        await decodeAndSetCookies(accessToken, refreshToken);
        return true;
    } catch (error) {
        console.error(error);
        await removeAllUserCookies();
        return false;
    }
}

export async function authMiddleware(req) {
    const token = req.cookies.get('accessToken');
    const refreshToken = req.cookies.get('refreshToken');

    if (!token && !refreshToken) {
        return NextResponse.redirect(new URL('/about', req.url)); // Redirect if no tokens
    }

    if (!token && refreshToken) {
        if (!await tryToRefreshToken(refreshToken.value)) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        return NextResponse.next();
    }

    return NextResponse.next(); 
}

export async function GeneralMiddleware(req) {
    const token = req.cookies.get('accessToken');
    const refreshToken = req.cookies.get('refreshToken');
    if (!token && refreshToken) {
        await tryToRefreshToken(refreshToken.value)
    }

    return NextResponse.next();
}

export function middleware(request) {
    const token = request.cookies.get('accessToken');

   
    if (token && request.nextUrl.pathname === '/about') {
        return NextResponse.redirect(new URL('/', request.url)); 
    }

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        return authMiddleware(request);
    } else {
        return GeneralMiddleware(request);
    }
}

export const config = {
    matcher: ['/', '/:path*'],
}
