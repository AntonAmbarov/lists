-- CreateTable
CREATE TABLE "ListsCardsModel" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "listId" INTEGER NOT NULL,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "ListsCardsModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ListsCardsModel" ADD CONSTRAINT "ListsCardsModel_listId_fkey" FOREIGN KEY ("listId") REFERENCES "ListModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListsCardsModel" ADD CONSTRAINT "ListsCardsModel_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "CardModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
