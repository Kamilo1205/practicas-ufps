import bcryptjs from 'bcryptjs';

interface SeedUser {
    email: string;
    password: string;
    rol: 'ESTUDIANTE' | 'TUTOR_PRACTICAS' | 'COORDINADOR' | 'EMPRESA' | 'DIRECTOR_PROGRAMA';
}

interface SeedData {
    usuarios: SeedUser[];
}

export const initialData: SeedData = {
    usuarios: [
        {
            email: 'cristiancamilojv@ufps.edu.co',
            password: bcryptjs.hashSync('123456'),
            rol: 'ESTUDIANTE'
        },
        {
            email: 'jesionomarfort@ufps.edu.co',
            password: bcryptjs.hashSync('123456'),
            rol: 'COORDINADOR'
        }
    ]
}