/*
  Warnings:

  - Added the required column `valor` to the `Caixinha` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Caixinha" ADD COLUMN     "valor" DOUBLE PRECISION NOT NULL;
