import type { NextAuthConfig } from "next-auth";
import { prisma } from "../prisma";

export const authConfig = {
  // カスタムログインページを指定（デフォルトUIの代わりに /login ページを使用）
  pages: {
    signIn: "/login",
    error: "/login",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const allowed = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!allowed) {
          return false;
        }
      }
      return true;
    },
    async authorized({ auth }) {
      return !!auth;
    },
    // ----------------------------------------------------------------
    // Callbacks: JWT ↔ Session カスタムフィールド処理
    // ----------------------------------------------------------------
    // ─── JWT Callback: 初回ログイン時(user && accountあり)のみDBを参照 ───
    async jwt({ token, user, account }) {
      if (user && account) {
        if (account.provider === "credentials") {
          // Credentialsログイン: authorize()で取得したuserをそのまま使用
          token.id = user.id;
          token.email = user.email;
          token.name = user.name;
          token.role = user.role;
          token.department = user.department;
        } else if (account.provider === "google") {
          // Googleログイン: プロファイル情報を元にカスタムフィールドを取得
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email as string },
            select: {
              id: true,
              email: true,
              password: true,
              name: true,
              role: true,
              departmentId: true,
            },
          });

          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.department = dbUser.departmentId;
          }
        }
      }
      return token;
    },
    // ─── Session Callback: クライアントに返す際にtoken → session.userにマッピング ───
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string | undefined;
        session.user.department = token.department as string | undefined;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
