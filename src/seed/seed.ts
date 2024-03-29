import bcryptjs from 'bcryptjs';

interface SeedUser {
    email: string;
    password: string;
    role: 'estudiante' | 'tutor' | 'coordinador' | 'empresa' | 'director';
}

interface SeedData {
    users: SeedUser[];
}

export const initialData: SeedData = {
    users: [
        {
            email: 'cristiancamilojv@ufps.edu.co',
            password: bcryptjs.hashSync('123456'),
            role: 'estudiante'
        },
        {
            email: 'jesionomarfort@ufps.edu.co',
            password: bcryptjs.hashSync('123456'),
            role: 'coordinador'
        }
    ]
}