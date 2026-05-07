/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Conta` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tipoConta` to the `Entrada` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrada" ADD COLUMN     "tipoConta" "Throw" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Conta_userId_key" ON "Conta"("userId");
