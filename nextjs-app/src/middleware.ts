import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOGIN = ["/login"];
const ROOT = ["/"];
const DASHBOARD = "/dashboard";

export default NextAuth(authConfig).auth(async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  const isAuth = req.auth;
  const isLogin = LOGIN.includes(pathname);
  const isRoot = ROOT.includes(pathname);

  // ログインした状態で / または /login へアクセス→　/dashboard
  if (isAuth && (isRoot || isLogin)) {
    const url = req.nextUrl.clone();
    url.pathname = DASHBOARD;
    return NextResponse.redirect(url);
  }

  // ログイン前の状態で保護ページへアクセス→　/login
  if (!isAuth && !isLogin) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

// matcherで特定のパスにのみミドルウェアを適用
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
