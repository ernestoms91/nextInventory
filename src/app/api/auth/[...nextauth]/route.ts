import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { use } from "react";
import User from "@/img/user.svg";

export const authOptions: NextAuthOptions= {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "string",
          placeholder: "*@icrt.cu",
        },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();

        if (user.error) throw new Error(user.msg);

        //Devuelve los datos del usario desde el backend
        return user.content;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.rol = user.rol;
        token.usuario = user.usuario;
        token.apellidos = user.apellidos;
        token.nombre = user.nombre;
        token.correo = user.correo;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.rol = token.rol;
        session.user.jwt = token.jwt;
        session.user.usuario = token.usuario;
        session.user.apellidos = token.apellidos;
        session.user.nombre = token.nombre;
        session.user.correo = token.correo;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
