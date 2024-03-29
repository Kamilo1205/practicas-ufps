import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';
import { User } from '@auth/core/types';

declare module 'next-auth' {
    interface Session {
        user: {
            role: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        role: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        role: string,
        email: string
    }
}

declare module '@auth/core/types' {
    interface User {
        role: string
    }
}