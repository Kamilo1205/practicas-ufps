import { z } from 'zod';

export const LoginSchema = z.object({
    email: z.string({
        required_error: 'La dirección de correo electrónico es requerido'
    }).email({
        message: 'La dirección de correo electrónico no es valida'
    }),
    password: z.string({
        required_error: 'La contraseña es requerida'
    }).min(5, {
        message: 'La contraseña debe tener 5 o mas caracteres'
    }),
});
