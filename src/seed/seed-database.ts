import { initialData } from './seed';
import prisma from '../lib/prisma';

async function main() {
    // await Promise.all([
        await prisma.usuario.deleteMany()
    // ]);

    const { users } = initialData;
    await prisma.usuario.createMany({
        data: users
    });
    
    console.log('Seed ejecutado correctamente');
}

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();