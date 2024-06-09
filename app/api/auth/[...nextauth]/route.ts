import NextAuth, { Account, User as AuthUser, TokenSet } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope:
            "https://mail.google.com/ openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "google") {
        return true;
      }
    },
    async jwt({ token, account }:{token: any, account: any}) {
      if (account) {
        token = Object.assign({}, token, {
          access_token: account.access_token,
        });
      }
      return token;
    },
    async session({ session, token }:{session: any, token: any}) {
      if (session) {
        session = Object.assign({}, session, {
          access_token: token.access_token,
        });
        console.log(session);
      }
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
