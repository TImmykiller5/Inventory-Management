import prismadb from '@/lib/prismadb';
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { getToken, JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
const secret = process.env.NEXTAUTH_SECRET

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 1,
    },
    jwt: {
      secret: secret,
      maxAge: 60 * 60 * 24 * 1,
    },
   
    // jwt: {
    //   // The maximum age of the NextAuth.js issued JWT in seconds.
    //   // Defaults to `session.maxAge`.
    //   maxAge: 60 * 60 * 24 * 30,
    //   // You can define your own encode/decode functions for signing and encryption
    //   async encode(params: {
    //     token: JWT
    //     secret: string
    //     maxAge: number
    //   }): Promise<string> {
    //     // return a custom encoded JWT string
    //     return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    //   },
    //   async decode(params: {
    //     token: string
    //     secret: string
    //   }): Promise<JWT | null> {
    //     // return a `JWT` object, or `null` if decoding failed
    //     return {}
    //   },
    pages: {
      signIn: "/login",
    },
  
  
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Credentials",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: {},
          password: {},
        },
        
        async authorize(credentials, req) {
          try {
            const email = credentials?.email;
            const password = credentials?.password;
          //   if (!email || !password) {
          //     return new NextResponse("Email and password are required", { status: 401 });
          // }
      
          const user = await prismadb.user.findUnique({
              where: {
                  email
              }
          });
          if (!user) {
              // return new NextResponse("Email does not exist", { status: 401 });
              return null;
          }
          console.log(user)
          const isValid = await compare(password || "", user.password);
      
          if (!isValid) {
              // return new NextResponse("Invalid password", { status: 401 });
              return null;
          }
      
          if (isValid) {
              return {
                 ...user,
                 id: user.id,
                 name: user.firstName + " " + user.lastName,
                 email: user.email,
                 role: user.role,
                 image: user.imageUrl,
                 
  
              }
          }
          } catch (error) {
            
          }
          return null;
        },
        
      }),
      
    ],
    callbacks: {
      // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
      async jwt({ token, user, account }) {
          if (user) token.role = user.role
          if (user) token.id = user.id
          if (account){
            token.accessToken = account.access_token
            token.refreshToken = account.refresh_token
          }
          return token
      },
      // If you want to use the role in client components
      async session({ session, token }) {
          if (session?.user) session.user.role = token.role
          if (session?.user) session.user.id = token.id
          // if (session?.user) session.user.accessToken = token.accessToken
          return session
      },
  }
  }