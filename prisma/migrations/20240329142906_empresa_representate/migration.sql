/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('estudiante', 'tutor', 'coordinador', 'empresa', 'director');

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "UserRol";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerificado" TIMESTAMP(3),
    "password" TEXT,
    "rol" "Rol" NOT NULL DEFAULT 'estudiante',
    "imagen" TEXT,
    "creado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actulizado" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estudiante" (
    "id" TEXT NOT NULL,
    "codigo" INTEGER NOT NULL,
    "creado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actulizado" TIMESTAMP(3) NOT NULL,
    "informacionPersonaId" TEXT NOT NULL,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TutorPractica" (
    "id" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "departamentoEmpresa" TEXT NOT NULL,
    "creado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actulizado" TIMESTAMP(3) NOT NULL,
    "informacionPersonaId" TEXT NOT NULL,

    CONSTRAINT "TutorPractica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InformacioPersonal" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "departamento" INTEGER NOT NULL,
    "municipio" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "creado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actulizado" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InformacioPersonal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepresentanteLegal" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT,
    "email" TEXT,
    "cedula" TEXT NOT NULL,
    "documentoIdentidadUrl" TEXT NOT NULL,

    CONSTRAINT "RepresentanteLegal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "NIT" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "industria" TEXT NOT NULL,
    "RUTUrl" TEXT NOT NULL,
    "camaraComercioUrl" TEXT,
    "registroMercantilUrl" TEXT,
    "representanteLegalId" TEXT NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_informacionPersonaId_key" ON "Estudiante"("informacionPersonaId");

-- CreateIndex
CREATE UNIQUE INDEX "TutorPractica_informacionPersonaId_key" ON "TutorPractica"("informacionPersonaId");

-- AddForeignKey
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_informacionPersonaId_fkey" FOREIGN KEY ("informacionPersonaId") REFERENCES "InformacioPersonal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TutorPractica" ADD CONSTRAINT "TutorPractica_informacionPersonaId_fkey" FOREIGN KEY ("informacionPersonaId") REFERENCES "InformacioPersonal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Empresa" ADD CONSTRAINT "Empresa_representanteLegalId_fkey" FOREIGN KEY ("representanteLegalId") REFERENCES "RepresentanteLegal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
