import bcryptjs from 'bcryptjs';

interface SeedUser {
    email: string;
    password: string;
    rol: 'estudiante' | 'tutor' | 'coordinador' | 'empresa' | 'director';
}

interface SeedData {
    users: SeedUser[];
}

export const initialData: SeedData = {
    users: [
        {
            email: 'cristiancamilojv@ufps.edu.co',
            password: bcryptjs.hashSync('123456'),
            rol: 'estudiante'
        },
        {
            email: 'jesionomarfort@ufps.edu.co',
            password: bcryptjs.hashSync('123456'),
            rol: 'coordinador'
        }
    ]
}