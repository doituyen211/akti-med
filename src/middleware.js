/**
 * Next.js middleware. In a real application this would protect routes
 * that require authentication by checking cookies or session tokens.
 * Since this demo has no backend, the middleware is a no‑op and simply
 * allows all requests to proceed.
 */
export function middleware() {
  // Intentionally left blank: authentication should be handled client side
  // for this demo. See lib/api.js for stubbed API helpers.
  return new Response(null, { status: 200 });
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
