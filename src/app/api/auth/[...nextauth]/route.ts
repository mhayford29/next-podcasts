import { dataSourceOptions } from '@/app/lib/typeorm';
import { TypeORMAdapter } from '@auth/typeorm-adapter';
import NextAuth, { Session, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

export const nextAuthOptions = {
  pages: {
    signIn: '/login', // Make sure this matches your custom sign-in page
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as const, // Use JWT-based session
  },
  adapter: TypeORMAdapter(dataSourceOptions),
  callbacks: {
    // Add UUID to the JWT token
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        // If it's a new token (e.g., during sign-in), include the user's UUID
        token.userId = user.id; // Assuming 'id' is the UUID generated by TypeORM
      }
      return token;
    },
    // Add UUID to the session object
    async session({ session, token }: { session: Session; token: JWT }) {
      if (typeof token.userId === 'string') {
        // Add the UUID from the JWT token to the session object
        session.userId = token.userId;
      }
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };