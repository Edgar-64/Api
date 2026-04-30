/*
  Warnings:

  - You are about to drop the column `assinante` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orcamento" ALTER COLUMN "mes" SET DEFAULT (extract(month from now()))::int;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "assinante",
ADD COLUMN     "planoUser" "Plan" NOT NULL DEFAULT 'BASICO';
