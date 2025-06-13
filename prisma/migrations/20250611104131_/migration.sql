/*
  Warnings:

  - You are about to drop the column `categoryId` on the `ListModel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ListModel" DROP CONSTRAINT "ListModel_categoryId_fkey";

-- AlterTable
ALTER TABLE "ListModel" DROP COLUMN "categoryId";
