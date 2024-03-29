# Development
Pasos para levantar la app en desarrollo

1. Clonar el repositorio.
2. Crear una copia de el .env.template y renombrarlo a .env y cambiar las variables de entorno.
3. Instalar dependencias ``` npm install ```.
4. Levantar la base de datos ``` docker compose up -d ```.
5. Correr las migraciones de prisma ``` npx prisma migrate dev ```.
6. Ejecutar seed ``` npm run seed ```.
7. Correr el proyecto ``` npm run dev ```.

>[!NOTE]
>
> Debe considerar que puerto se expone en el docker compose y que puerto configura en el archivo .env

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod
