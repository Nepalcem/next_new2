import NextAuth from "next-auth";
import { authOptions } from "../[...nextauth]";
export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
