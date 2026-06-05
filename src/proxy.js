import { NextResponse } from "next/server";

/**
 * Next.js Proxy.
 * Hiện tại không chặn route nào, chỉ cho request đi tiếp.
 */
export function proxy() {
  // const token = request.cookies.get("token")?.value;

  // if (request.nextUrl.pathname.startsWith("/dashboard") && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // if (request.nextUrl.pathname.startsWith("/login") && token) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
