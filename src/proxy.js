import { NextResponse } from "next/server";

/**
 * Next.js Proxy.
 * Hiện tại không chặn route nào, chỉ cho request đi tiếp.
 */
export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
