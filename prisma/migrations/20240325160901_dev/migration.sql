-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('estudiante', 'tutor', 'coordinador', 'empresa', 'directora');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'estudiante',
    "imagen" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
