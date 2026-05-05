/*
  Warnings:

  - You are about to drop the column `userId` on the `Conta` table. All the data in the column will be lost.
  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MovimentoCaixa` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `move` to the `Caixinha` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valorMove` to the `Caixinha` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conta" DROP CONSTRAINT "Conta_userId_fkey";

-- AlterTable
ALTER TABLE "Caixinha" ADD COLUMN     "move" "Throw" NOT NULL,
ADD COLUMN     "valorMove" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Conta" DROP COLUMN "userId";

-- DropTable
DROP TABLE "Categoria";

-- DropTable
DROP TABLE "MovimentoCaixa";
