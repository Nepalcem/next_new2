import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import sql from "@/app/lib/db/db"; // your PostgreSQL helper

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const result = await sql`
            SELECT * FROM "Users" WHERE email = ${credentials.email} LIMIT 1;
          `;
          const user = result[0];
          if (!user) return null;

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) return null;

          // Return user object (NextAuth will attach to JWT)
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role || "user",
          };
        } catch (err) {
          console.error("Auth error:", err);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id =
          typeof user.id === "string" ? parseInt(user.id, 10) : user.id;
        token.role = user.role || "user";
      }
      return token;
    },
    async session({ session, token }) {
      // Attach id and role from token to session.user
      if (session.user) {
        session.user.id = token.id as number;
        session.user.role = token.role || "user";
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
