import { NextResponse } from 'next/server'

export function middleware(request) {
  // Lấy token từ cookies (bạn sẽ set cookie khi login thành công)
  // const token = request.cookies.get('token')?.value

  // // Nếu truy cập vào /dashboard mà chưa có token -> Đẩy về /login
  // if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  // // Nếu đã có token mà cố vào /login -> Đẩy vào /dashboard
  // if (request.nextUrl.pathname.startsWith('/login') && token) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }

  // return NextResponse.next()
  
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}