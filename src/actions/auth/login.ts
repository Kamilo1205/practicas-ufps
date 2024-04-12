"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth.config";
import { LoginSchema } from "@/schemas";
import { z } from "zod";
 
export async function authenticate(
    formData: z.infer<typeof LoginSchema>
) {
    try {
        const respuesta = await signIn("credentials", {
            ...formData,
            redirect: false,
        });
        return { ok: true, message: "Inicio de sesion exitoso." };
    } catch ( error ) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin": {
                    return { ok: false, message: "Credenciales invalidas." };
                }
                default:
                    return { ok: false, message: error.cause?.err?.message };
            }
        }
        return { ok: false, message: "Ocurrio un error, por favor intentalo de nuevo" };;
    }
}