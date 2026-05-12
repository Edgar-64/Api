/*
  Warnings:

  - You are about to drop the column `vAtual` on the `Caixinha` table. All the data in the column will be lost.
  - Added the required column `valorAtual` to the `Caixinha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Caixinha" DROP COLUMN "vAtual",
ADD COLUMN     "valorAtual" DOUBLE PRECISION NOT NULL;
