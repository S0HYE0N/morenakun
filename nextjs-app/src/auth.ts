import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { Provider } from "next-auth/providers";
import { prisma } from "../prisma";
import { compare } from "bcrypt";
import { authConfig } from "./auth.config";

// 認証Provider一覧（ローカル認証＋Google認証）
const providers: Provider[] = [
  Credentials({
    // メールアドレスとパスワードによる認証
    name: "Credentials",
    credentials: {
      email: { label: "メールアドレス", type: "text" },
      password: { label: "パスワード", type: "password" },
    },
    // ログイン時に呼ばれる認証関数
    async authorize(credentials) {
      // 入力チェック（未入力の場合は認証失敗）
      if (!credentials || !credentials.email || !credentials.password) {
        return null;
      }

      // DBからユーザーを取得
      const user = await prisma.user.findUnique({
        where: { email: credentials.email as string },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
          role: true,
          departmentId: true,
        },
      });

      // ユーザーが存在しない場合は認証失敗
      if (!user) {
        return null;
      }

      // パスワードをハッシュ化された値と比較
      const isValid = await compare(credentials.password as string, user.password!);
      if (!isValid) {
        return null;
      }

      // 認証成功時：セッション用のユーザー情報を返す
      return {
        id: user.id,
        email: user.email,
        name: user.name ?? "",
        role: user.role,
        department: user.departmentId ?? "",
      };
    },
  }),
  Google, // Google OAuth 認証プロバイダー
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers,
});

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   providers,
//   // カスタムログインページを指定（デフォルトUIの代わりに /login ページを使用）
//   pages: {
//     signIn: "/login",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       // session.user.id = token.sub ?? "";
//       // return session;
//       if (token) {
//         session.user.id = token.id as string;
//       }
//       return session;
//     },
//     async authorized({ auth }) {
//       return !!auth;
//     },
//   },
// });
