/*
  Warnings:

  - Added the required column `object` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `object` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "object" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Income" ADD COLUMN     "object" TEXT NOT NULL;
