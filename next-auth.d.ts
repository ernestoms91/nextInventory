// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      jwt: string;
      rol: string;
      usuario;
      apellidos: string;
      nombre: string;
      correo: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    jwt: string;
    rol: string;
    usuario;
    apellidos: string;
    nombre: string;
    correo: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    jwt: string;
    rol: string;
    usuario;
    apellidos: string;
    nombre: string;
    correo: string;
  }
}
