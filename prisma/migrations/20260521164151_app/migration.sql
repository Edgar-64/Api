/*
  Warnings:

  - You are about to drop the column `move` on the `Caixinha` table. All the data in the column will be lost.
  - You are about to drop the column `valorMove` on the `Caixinha` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Caixinha" DROP COLUMN "move",
DROP COLUMN "valorMove";
