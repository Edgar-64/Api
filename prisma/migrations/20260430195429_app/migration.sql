/*
  Warnings:

  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `limite` on the `Orcamento` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Orcamento" ALTER COLUMN "mes" DROP DEFAULT,
ALTER COLUMN "mes" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "limite",
ADD COLUMN     "limite" DOUBLE PRECISION NOT NULL;

-- DropTable
DROP TABLE "Service";

-- CreateTable
CREATE TABLE "servico" (
    "idServ" SERIAL NOT NULL,
    "nameServ" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "beneficios" TEXT NOT NULL,

    CONSTRAINT "servico_pkey" PRIMARY KEY ("idServ")
);
