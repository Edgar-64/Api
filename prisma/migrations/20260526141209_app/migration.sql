/*
  Warnings:

  - Added the required column `userId` to the `servico` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "servico" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "servico" ADD CONSTRAINT "servico_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
