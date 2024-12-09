import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    userId: string; // Custom field for storing the user's UUID
  }

  interface JWT {
    userId: string; // Custom field for storing the user's UUID in the JWT
  }
}
