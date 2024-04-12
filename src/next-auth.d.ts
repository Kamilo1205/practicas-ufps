import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { User } from "@auth/core/types";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            role: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        id: string,
        role: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string,
        role: string,
        email: string
    }
}

declare module "@auth/core/types" {
    interface User {
        id: string,
        role: string
    }
}