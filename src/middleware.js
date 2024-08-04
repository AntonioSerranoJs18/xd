import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token'); 

    const isAuthenticated = !!token; 

    
    if (!isAuthenticated && pathname === '/') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

   
    if (isAuthenticated && pathname === '/login') {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next(); 
}

export const config = {
    matcher: ['/', '/login'], 
};
