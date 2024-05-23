import { z } from "zod";

export const RegistroSchema = z.object({
  email: z.string({
    required_error: 'La dirección de correo electrónico es requerida'
  }).email({
    message: 'La dirección de correo electrónico no es valida'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida'
  }).min(5, {
    message: 'La contraseña debe tener 5 o mas caracteres'
  }),
  confirmPassword: z.string({
    required_error: 'La confirmación es requerida'
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'], // Esto hará que el error aparezca en el campo confirmPassword
});
