import { z } from 'zod';

export const PersonalFormSchema = z.object({
    nombre: z.string({
        required_error: 'El nombre es requerido',
        invalid_type_error: 'El nombre debe ser una cadena de texto'
    }).min(2, {
        message: 'El nombre es demasiado corto'
    }),
    apellido: z.string({
        required_error: 'El apellido es requerido'
    }).min(2, {
        message: 'El apellido es demasiado corto'
    }),
    fechaNacimiento: z.date({
        required_error: 'La fecha de nacimiento es necesaria',
        invalid_type_error: 'Esto no es una fecha!'
    }),
    genero: z.string({
        required_error: 'El genero es requerido',
    }),
    direccion: z.string({
        required_error: 'La dirección es requerida',
    }),
    telefono: z.string({
        required_error: 'El número de telefono es requerido',
    }),
    departamento: z.string({
        required_error: 'El departamento de residencia es requerido',
    }),
    municipio: z.string({
        required_error: 'El municipio de residencia es requerido',
    })
});