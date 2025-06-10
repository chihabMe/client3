
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // We leave providers empty here. It will be defined in the main auth.ts file.
  providers: [], 
  pages: {
    signIn: "/admin/auth/login",
    error: "/admin/auth/error",
  },
  secret: process.env.SECRET ?? "owijfkdsgf",
  callbacks: {
    // This authorized callback is essential for the middleware logic
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      // Allow access to /admin/auth/** for everyone to enable login
      if (pathname.startsWith('/admin/auth')) {
        return true;
      }

      // For any other /admin/** route, the user must be logged in
      if (pathname.startsWith('/admin')) {
        return isLoggedIn;
      }

      // Allow access to all other routes by default
      return true;
    },
    // The jwt and session callbacks are also safe for the edge,
    // but they are only strictly needed in the main auth.ts file.
    // It's clean to keep them there.
  },
} satisfies NextAuthConfig;
