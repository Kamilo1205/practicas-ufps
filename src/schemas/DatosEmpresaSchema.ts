import { z } from "zod";

// Expresión regular para verificar el formato XXXXXXXXX-X
const formatoEspecifico = /^[0-9]{9}-[0-9]$/;
// Expresión regular para verificar que solo se ingresen números
const soloNumeros = /^[0-9]+$/;


export const DatosEmpresaSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre de la empresa es requerido',
    invalid_type_error: 'El nombre debe ser una cadena de texto'
  }).min(3, 'El nombre de la empresa debe tener al menos 3 caracteres'),
  telefono: z.string({
    required_error: 'El número de telefono es requerido',
    invalid_type_error: 'El telefono ingresado no es valido'
  }).min(1, 'El número de telefono es requerido'),
  direccion: z.string({
    required_error: 'La dirección es requerida',
    invalid_type_error: 'Algo no esta bien con la dirección'
  }).min(1, 'La dirección es requerida'),  
  nit: z.string({
    required_error: 'El NIT es requerido',
    invalid_type_error: 'El NIT ingresado no es valido',   
  }).refine(
      (val) => soloNumeros.test(val) || formatoEspecifico.test(val),
      {
        message: 'El NIT deben ser solo números o en formato XXXXXXXXX-X',
      }
  ),
  sector: z.string({
    required_error: 'El sector es requerido',
  }).refine(
    (val) => val === 'Privada' || val === 'Publica',
    {
      message: 'El sector debe ser Privado o Público',
    }
  ),
  industria: z.string({
    required_error: 'La industria es requerida'
  }),
  pais: z.string({
    required_error: 'El pais es requerido',
    invalid_type_error: 'El pais ingresado no es valido'
  
  }),
  municipio: z.string({
    required_error: 'El municipio es requerido',
    invalid_type_error: 'El municipio ingresado no es valido'
  }).min(1, 'El municipio es requerido'),
  departamento: z.string({
    required_error: 'El departamento es requerido',
    invalid_type_error: 'El departamento ingresado no es valido'
  }).min(1, 'El departamento es requerido'),
  rut: z.any().
    refine(file => file?.type === 'application/pdf', { message: 'El archivo debe ser un PDF' })
    .refine((file) => file, 'Debe adjuntar un archivo'),
  camaraComercio: z.any().
    refine(file => file?.type === 'application/pdf', { message: 'El archivo debe ser un PDF' })
    .refine((file) => file, 'Debe adjuntar un archivo'),
  
  
})

//TODO: Pedir feedback del formulario para saber si está correcto.

/**
 * 
 *  camaraComercio: z.string({
    required_error: 'La camara de comercio es requerida',
    invalid_type_error: 'El email ingresado no es valido'
  }).includes('application/pdf',{ message:'El archivo debe ser un PDF'}),


 *   camaraComercio: z.any()
    .refine((file) => file?.length !==0, 'Debe adjuntar un archivo'),
 */