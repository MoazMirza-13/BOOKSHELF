import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const NESTJS_API_URL = process.env.NESTJS_API_URL;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // When user first signs in
      if (user) {
        // Send user info to NestJS API to create/update user
        const res = await fetch(`${NESTJS_API_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
            googleId: profile?.sub,
          }),
        });
        const data = await res.json();
        token.id = data.id; // NestJS user id
        token.role = data.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
