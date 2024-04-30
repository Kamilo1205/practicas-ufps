import { z } from "zod";

// Expresión regular para verificar que solo se ingresen números
const soloNumeros = /^[0-9]+$/;
const soloTelefonos = /^(\+\d{1,3})?(\d{6,14})$/


export const DatosRepresentanteLegalSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre del representante legal es requerido',
    invalid_type_error: 'El nombre debe ser una cadena de texto'
  }),
  documento: z.string({
    required_error: 'El documento del representante legal es requerido',
    invalid_type_error: 'El documento debe ser un número'
  }).refine(
    (val) => soloNumeros.test(val) ,
    {
      message: 'El documento de identidad solo puede contener números.',
    }
  ),
  email: z.string()
    .min(1, { message: "El correo es requerido." })
    .email("El dato ingresado no es un correo valido."),
  telefono: z.string({
    required_error: 'El telefono del representante legal es requerido',
    invalid_type_error: 'El telefono debe ser una cadena de texto'
  }).refine((val) => !val.includes(' '), { message: 'Sin espacios en blanco' })
    .refine(
    (val) => soloTelefonos.test(val),
    {
      message: 'El telefono debe ser un número de telefono valido',
    }
  
  ),
  documentoFile: z.any().
    refine(file => file?.type === 'application/pdf', { message: 'El archivo debe ser un PDF' })
    .refine((file) => file, 'Debe adjuntar un archivo'),
})
