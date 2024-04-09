# Development
Pasos para levantar la app en desarrollo

1. Clonar el repositorio.
2. Crear una copia de el .env.template y renombrarlo a .env y cambiar las variables de entorno.
3. Instalar dependencias ``` npm install ```.
4. Levantar la base de datos ``` docker compose up -d ```.
5. Correr las migraciones de prisma ``` npx prisma migrate dev ```.
6. Ejecutar seed ``` npm run seed ```.
7. Correr el proyecto ``` npm run dev ```.

>[!IMPORTANT]
>
> Debe considerar que puerto se expone en el docker compose y que puerto configura en el archivo .env
> Por lo general postgres expone el puerto 5432 por defecto.

## Configuración para almacenar en GoogleDrive

1. Crear un nuevo proyecto en google cloud. 
2. Habilitar la google drive API[https://console.cloud.google.com/apis/library/drive.googleapis.com].
3. Crear credenciales para una cuenta de servicio. ![imagen de donde encontrar la opción cuenta de servicio](/doc/image.png)
4. Seleccionar la cuenta de servicio creada. ![Como ingresar a la cuenta de servicio](/doc/image-1.png)
5. Crear una clave en formato JSON. ![Donde crear una clave](/doc/image-2.png)
6. Despues de crear la clave esta se descarga automaticamente. Ahora debe poner el archivo JSON en la carpeta raiz del proyecto y renobrala como googleApiKey.json.

>[!IMPORTANT]
>
> Asegurese de que el nombre del archivo sea exacto como se indicó. 

# Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod
