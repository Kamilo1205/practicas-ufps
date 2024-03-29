import NextAuth, { type  NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';

import prisma from './lib/prisma';
import { LoginSchema } from './schemas';
import { UserRol } from '@prisma/client';

export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = LoginSchema.safeParse(credentials); 
        
        if ( !parsedCredentials.success ) {
          throw new Error("Las credenciales proporcionadas son inválidas.");
        };
        const { email, password } = parsedCredentials.data;
        
        //Buscar el correo
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() }});
        if ( !user ) {
          throw new Error("El correo electrónico proporcionado no está asociado con ninguna cuenta.");
        };

        if ( !user.password ) {
          throw new Error("Tu cuenta no tiene una contraseña configurada. Por favor, utiliza un método de inicio de sesión alternativo.");
        };
        
        // Comparar las contraseñas
        if ( !bcryptjs.compareSync( password, user.password ) ) {
          throw new Error("La contraseña proporcionada es incorrecta. Por favor, verifica tu contraseña e inténtalo de nuevo.");
        };

        // Regresar el usaurio sin el password
        const { password: _, ...rest } = user;
        return rest;
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if ( account?.provider === 'credentials' ) return true;
      
      if ( !user || !user?.email ) {
        throw new Error("El usuario no tiene un correo electrónico asociado o el usuario es inválido.");
      };
      const userDB = await prisma.user.findUnique({ where: { email: user?.email?.toLowerCase() }});

      if ( !userDB ) {
        throw new Error("El correo electrónico proporcionado no está asociado con ninguna cuenta.");
      };

      if (!userDB?.image && user.image) {
        // Si no hay una imagen en la base de datos pero hay una nueva imagen proporcionada, actualizarla
        await prisma.user.update({
          data: { image: user.image },
          where: { id: userDB.id }
        });
      } else if (userDB?.image && user.image && userDB?.image !== user.image) {
        // Si hay una imagen en la base de datos y también una nueva imagen proporcionada, y son diferentes, actualizarla
        await prisma.user.update({
          data: { image: user.image },
          where: { id: userDB.id }
        });
      }
      
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRol;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {

      if ( !token.sub ) return token;
      const userDB = await prisma.user.findUnique({ where: { id: token.sub }});

      if (!userDB) return token;

      token.email = userDB.email;
      token.role = userDB.role;

      return token;
    }
  },
};

export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth( authConfig );