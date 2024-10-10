import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        // Check if the email exists in the database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }, // Ensure email is unique
        });

        if (!user) {
          return null;
        }

        // Compare passwords
        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        // Return the user object on successful login
        return {
          id: user.id,
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log('session token', token);
  
      // Ensure token fields are mapped to session.user
      if (token) {
        session.user = {
          ...session.user,  // Keep the existing session fields
          id: token.id,     // Add the id from the token
          username: token.username,  // Add the username from the token
        };
      }
      return session;  // Return the session object
    },
  
    async jwt({ token, user }) {
      console.log('JWT token', token);
  
      // Add user fields to token on login
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;  // Return the updated token
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
