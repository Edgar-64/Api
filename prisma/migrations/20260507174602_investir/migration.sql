/*
  Warnings:

  - Added the required column `dataResgate` to the `Entrada` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrada" ADD COLUMN     "dataResgate" TIMESTAMP(3) NOT NULL;
