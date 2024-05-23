import NextAuth, { type  NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcryptjs from 'bcryptjs';

import prisma from './lib/prisma';
import { LoginSchema } from './schemas';
import { Rol } from '@prisma/client';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/login'
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
          throw new Error('Las credenciales proporcionadas son inválidas.');
        };
        const { email, password } = parsedCredentials.data;
        
        //TODO: Buscar el correo - Acomodar para que ahora mande una request a la API.  
        const usuario = await prisma.usuario.findUnique({ where: { email: email.toLowerCase() }});
        if ( !usuario ) {
          throw new Error('El correo electrónico proporcionado no está asociado con ninguna cuenta.');
        };

        if ( !usuario.password ) {
          throw new Error('Tu cuenta no tiene una contraseña configurada. Por favor, utiliza un método de inicio de sesión alternativo.');
        };
        
        // Comparar las contraseñas
        if ( !bcryptjs.compareSync( password, usuario.password ) ) {
          throw new Error('La contraseña proporcionada es incorrecta. Por favor, verifica tu contraseña e inténtalo de nuevo.');
        };

        // Regresar el usaurio sin el password
        const { password: _, ...rest } = usuario;
        return {
          id: rest.id,
          image: rest.imagen,
          email: rest.email,
          role: rest.rol,
        };
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if ( account?.provider === 'credentials' ) return true;
      
      if ( !user || !user?.email ) {
        throw new Error('El usuario no tiene un correo electrónico asociado o el usuario es inválido.');
      };
      const usuario = await prisma.usuario.findUnique({ where: { email: user?.email?.toLowerCase() }});

      if ( !usuario ) {
        throw new Error('El correo electrónico proporcionado no está asociado con ninguna cuenta.');
      };

      if ( !usuario?.imagen && user.image || usuario?.imagen && user.image && usuario?.imagen !== user.image ) {
        // Si no hay una imagen en la base de datos pero hay una nueva imagen proporcionada, actualizarla
        await prisma.usuario.update({
          data: { imagen: user.image },
          where: { id: usuario.id }
        });
      } 
      
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      if (token.id && session.user) {
        session.user.id = token.id;
      }

      if (token.role && session.user) {
        session.user.role = token.role as Rol;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {

      if ( !token.sub ) return token;
      const usuario = await prisma.usuario.findUnique({ where: { email: token.email }});

      if (!usuario) return token;

      token.role = usuario.rol;
      token.id = usuario.id;
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