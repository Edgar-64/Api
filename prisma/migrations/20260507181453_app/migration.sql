/*
  Warnings:

  - Added the required column `contaId` to the `Entrada` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contaId` to the `Lancamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrada" ADD COLUMN     "contaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lancamento" ADD COLUMN     "contaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Entrada" ADD CONSTRAINT "Entrada_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("idConta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lancamento" ADD CONSTRAINT "Lancamento_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta"("idConta") ON DELETE RESTRICT ON UPDATE CASCADE;
