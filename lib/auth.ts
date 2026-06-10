import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db, docToData } from "./firebase";
import type { AdminUser } from "./types";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const snap = await db
          .collection("adminUsers")
          .where("email", "==", credentials.email)
          .limit(1)
          .get();

        if (snap.empty) return null;

        const usuario = docToData<AdminUser>(snap.docs[0]);

        const passwordValida = await bcrypt.compare(
          credentials.password,
          usuario.password
        );

        if (!passwordValida) return null;

        return { id: usuario.id, email: usuario.email, name: usuario.nombre };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
