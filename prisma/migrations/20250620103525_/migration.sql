/*
  Warnings:

  - A unique constraint covering the columns `[listId,cardId]` on the table `ListsCardsModel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `listsCardsId` to the `VoteModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `VoteModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VoteModel" ADD COLUMN     "listsCardsId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RatingModel" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "listsCardsId" INTEGER NOT NULL,

    CONSTRAINT "RatingModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ListsCardsModel_listId_cardId_idx" ON "ListsCardsModel"("listId", "cardId");

-- CreateIndex
CREATE UNIQUE INDEX "ListsCardsModel_listId_cardId_key" ON "ListsCardsModel"("listId", "cardId");

-- AddForeignKey
ALTER TABLE "VoteModel" ADD CONSTRAINT "VoteModel_listsCardsId_fkey" FOREIGN KEY ("listsCardsId") REFERENCES "ListsCardsModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteModel" ADD CONSTRAINT "VoteModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingModel" ADD CONSTRAINT "RatingModel_listsCardsId_fkey" FOREIGN KEY ("listsCardsId") REFERENCES "ListsCardsModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
