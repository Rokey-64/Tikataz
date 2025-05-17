import { NextResponse } from 'next/server';
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  if (/^\/(me|edit|rfq|expired)/.test(path)) {
    const cookieHeader = request.headers.get('cookie');

    const token = request.cookies.get('refreshToken')?.value || null;
    if (!token) {
      return NextResponse.redirect(new URL('http://accounts.tikataz.vn/'));
    }

    try {
      await fetch(API_HOST, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookieHeader || '',  // gửi cookie từ request ban đầu
        }
      });
    }
    catch (error) {
      return NextResponse.redirect(new URL('http://accounts.tikataz.vn/'));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/(.*)']
};