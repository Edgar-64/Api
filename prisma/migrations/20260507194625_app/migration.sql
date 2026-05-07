/*
  Warnings:

  - Changed the type of `periodo` on the `Agendado` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Agendado" DROP COLUMN "periodo",
ADD COLUMN     "periodo" TIMESTAMP(3) NOT NULL;
