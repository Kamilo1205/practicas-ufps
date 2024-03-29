/*
  Warnings:

  - You are about to drop the column `imagen` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imagen",
ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "Account";
