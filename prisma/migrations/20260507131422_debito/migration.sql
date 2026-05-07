/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Conta` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Entrada` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Lancamento` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conta_userId_key" ON "Conta"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Entrada_userId_key" ON "Entrada"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Lancamento_userId_key" ON "Lancamento"("userId");
