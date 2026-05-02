// middleware.ts
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ROUTE } from "./types/constant/route";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isLoggedIn = !!token;
  
  // Lấy full URL hiện tại
  const currentUrl = req.nextUrl.href;
  const pathname = req.nextUrl.pathname;

  // Tạo response tiếp tục (không chặn request)
  const res = NextResponse.next();

  // Gắn URL vào header để server component có thể đọc
  res.headers.set("x-current-url", currentUrl);

  // ---------- LOGIC LOGIN ----------
  // Chưa login mà vào trang khác /login → đá về /login
  if (!isLoggedIn && pathname !== ROUTE.LOGIN && pathname !== ROUTE.REGISTER) {
    return NextResponse.redirect(new URL(ROUTE.LOGIN, req.url));
  }

  // Đã login mà vẫn vào /login → đá về /home
  if (isLoggedIn && (pathname === ROUTE.LOGIN || pathname === ROUTE.REGISTER)) {
    return NextResponse.redirect(new URL(ROUTE.HOME, req.url));
  }

  return res;
}

// Áp middleware cho tất cả page (trừ static, api)
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|assets).*)"],
};