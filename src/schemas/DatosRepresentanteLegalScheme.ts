import { z } from "zod";


export const DatosRepresentanteLegalSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre del representante legal es requerido',
    invalid_type_error: 'El nombre debe ser una cadena de texto'
  }),
  documento: z.number({
    required_error: 'El documento del representante legal es requerido',
    invalid_type_error: 'El documento debe ser un número'
  }),
  email: z.string()
    .min(1, { message: "El correo es requerido." })
    .email("El dato ingresado no es un correo valido."),
  telefono: z.string({
    required_error: 'El telefono del representante legal es requerido',
    invalid_type_error: 'El telefono debe ser una cadena de texto'
  }),
})
