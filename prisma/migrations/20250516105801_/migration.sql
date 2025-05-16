/*
  Warnings:

  - You are about to drop the `UserModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `authorId` on the `CardModel` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "UserModel_email_key";

-- DropIndex
DROP INDEX "UserModel_userName_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserModel";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CardModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL
);
INSERT INTO "new_CardModel" ("createdAt", "description", "id", "img", "status", "title", "updatedAt") SELECT "createdAt", "description", "id", "img", "status", "title", "updatedAt" FROM "CardModel";
DROP TABLE "CardModel";
ALTER TABLE "new_CardModel" RENAME TO "CardModel";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
