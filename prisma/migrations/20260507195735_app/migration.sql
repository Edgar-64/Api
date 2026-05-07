/*
  Warnings:

  - Changed the type of `previsao` on the `Agendado` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Agendado" DROP COLUMN "previsao",
ADD COLUMN     "previsao" TIMESTAMP(3) NOT NULL;
