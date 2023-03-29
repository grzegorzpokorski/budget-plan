/*
  Warnings:

  - Added the required column `category` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FinanceCategory" AS ENUM ('EXPENSE', 'PROFIT');

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "category" "FinanceCategory" NOT NULL;
