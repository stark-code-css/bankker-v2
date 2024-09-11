import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import prisma from './lib/db';
import { comparePassword, hashPassword } from './lib/hashPassword';

const getUserFromDb = async (email: unknown, password: unknown) => {
  try {
    const response = await prisma.users.findFirstOrThrow({
      where: {
        email: email as string,
      },
    });

    if (!response) return null;
    const isPasswordMatch = await comparePassword(
      password as string,
      response.password
    );
    if (!isPasswordMatch) return null;
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          let user = await getUserFromDb(
            credentials.email,
            credentials.password
          );
          if (!user) {
            throw new Error('User not found.');
          }
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
