
import NextAuth from "next-auth/next";
import prismadb from '@/lib/prismadb';
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { getToken, JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import { authOptions } from "@/lib/auth";



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };