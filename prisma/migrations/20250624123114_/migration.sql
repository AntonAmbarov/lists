/*
  Warnings:

  - You are about to drop the column `listsCardsId` on the `RatingModel` table. All the data in the column will be lost.
  - You are about to drop the column `listsCardsId` on the `VoteModel` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `VoteModel` table. All the data in the column will be lost.
  - You are about to drop the `ListsCardsModel` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cardToListId]` on the table `RatingModel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[authorId,cardToListId]` on the table `VoteModel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cardToListId` to the `RatingModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `VoteModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardToListId` to the `VoteModel` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `value` on the `VoteModel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ListsCardsModel" DROP CONSTRAINT "ListsCardsModel_cardId_fkey";

-- DropForeignKey
ALTER TABLE "ListsCardsModel" DROP CONSTRAINT "ListsCardsModel_listId_fkey";

-- DropForeignKey
ALTER TABLE "RatingModel" DROP CONSTRAINT "RatingModel_listsCardsId_fkey";

-- DropForeignKey
ALTER TABLE "VoteModel" DROP CONSTRAINT "VoteModel_listsCardsId_fkey";

-- DropForeignKey
ALTER TABLE "VoteModel" DROP CONSTRAINT "VoteModel_userId_fkey";

-- AlterTable
ALTER TABLE "RatingModel" DROP COLUMN "listsCardsId",
ADD COLUMN     "cardToListId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "VoteModel" DROP COLUMN "listsCardsId",
DROP COLUMN "userId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "cardToListId" INTEGER NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ListsCardsModel";

-- DropEnum
DROP TYPE "ValueVote";

-- CreateTable
CREATE TABLE "CardToListModel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "CardToListModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CardToListModel_listId_cardId_idx" ON "CardToListModel"("listId", "cardId");

-- CreateIndex
CREATE UNIQUE INDEX "CardToListModel_listId_cardId_key" ON "CardToListModel"("listId", "cardId");

-- CreateIndex
CREATE INDEX "RatingModel_cardToListId_idx" ON "RatingModel"("cardToListId");

-- CreateIndex
CREATE UNIQUE INDEX "RatingModel_cardToListId_key" ON "RatingModel"("cardToListId");

-- CreateIndex
CREATE INDEX "VoteModel_cardToListId_idx" ON "VoteModel"("cardToListId");

-- CreateIndex
CREATE UNIQUE INDEX "VoteModel_authorId_cardToListId_key" ON "VoteModel"("authorId", "cardToListId");

-- AddForeignKey
ALTER TABLE "CardToListModel" ADD CONSTRAINT "CardToListModel_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ListModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardToListModel" ADD CONSTRAINT "CardToListModel_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteModel" ADD CONSTRAINT "VoteModel_cardToListId_fkey" FOREIGN KEY ("cardToListId") REFERENCES "CardToListModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteModel" ADD CONSTRAINT "VoteModel_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingModel" ADD CONSTRAINT "RatingModel_cardToListId_fkey" FOREIGN KEY ("cardToListId") REFERENCES "CardToListModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
