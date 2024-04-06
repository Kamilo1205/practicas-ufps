import { z } from "zod";

export const DatosEmpresaSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre de la empresa es requerido',
    invalid_type_error: 'El nombre debe ser una cadena de texto'
  }),
  telefono: z.string({
    required_error: 'El número de telefono es requerido',
    invalid_type_error: 'El telefono ingresado no es valido'
  }),
  direccion: z.string({
    required_error: 'La dirección es requerida',
    invalid_type_error: 'Algo no esta bien con la dirección'
  }),
  nit: z.string({
    required_error: 'El NIT es requerido',
    invalid_type_error: 'El NIT ingresado no es valido'
  }),
  pais: z.string({
    required_error: 'El pais es requerido',
    invalid_type_error: 'El pais ingresado no es valido'
  
  }),
  municipio: z.string({
    required_error: 'El municipio es requerido',
    invalid_type_error: 'El municipio ingresado no es valido'
  }),
  departamento: z.string({
    required_error: 'El departamento es requerido',
    invalid_type_error: 'El departamento ingresado no es valido'
  }),
  rut: z.string({
    required_error: 'El RUT es requerido',
    invalid_type_error: 'El RUT ingresado no es valido'
  }),
  camaraComercio: z.any()
    .refine((file) => file?.length !==0, 'Debe adjuntar un archivo'),
  email: z.string({
    required_error: 'El email es requerido',
    invalid_type_error: 'El email ingresado no es valido'
  }),
  
})

//TODO: La camara de comercio y el RUT deben ser archivos.