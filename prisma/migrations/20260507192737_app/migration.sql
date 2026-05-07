/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `Agendado` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `Agendado` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agendado" ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Lancamento" ALTER COLUMN "statusLaunch" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "tipo" DROP DEFAULT,
ALTER COLUMN "status" DROP DEFAULT,
ALTER COLUMN "planoUser" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Agendado_userEmail_key" ON "Agendado"("userEmail");

-- AddForeignKey
ALTER TABLE "Agendado" ADD CONSTRAINT "Agendado_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
