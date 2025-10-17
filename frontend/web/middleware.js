// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const guest = req.cookies.get("guest");

  const guestUser = guest?.value === "true";

  const url = req.nextUrl.clone();

  // Protect authenticated routes
  if (!token && !guestUser && url.pathname !== "/signin") {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // Prevent logged-in users from visiting signin
  if ((token || guestUser) && url.pathname === "/signin") {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
