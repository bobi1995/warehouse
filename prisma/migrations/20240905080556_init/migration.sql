/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "materialId" INTEGER NOT NULL,
    "stillageId" INTEGER NOT NULL,
    "cellId" INTEGER NOT NULL,
    "lot" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "quan_dev" INTEGER NOT NULL,
    "quan_ok" INTEGER NOT NULL,
    "comment" TEXT,
    "desc" TEXT,
    "deliveryDate" DATETIME NOT NULL,
    "inboundDate" DATETIME NOT NULL,
    CONSTRAINT "Inventory_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Inventory_stillageId_fkey" FOREIGN KEY ("stillageId") REFERENCES "Stillage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Inventory_cellId_fkey" FOREIGN KEY ("cellId") REFERENCES "Cell" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Stillage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shelves" INTEGER NOT NULL,
    "columns" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Cell" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stillageId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "size_x" REAL NOT NULL,
    "size_y" REAL NOT NULL,
    "size_z" REAL NOT NULL,
    "max_weight" REAL NOT NULL,
    "isolator" BOOLEAN NOT NULL,
    CONSTRAINT "Cell_stillageId_fkey" FOREIGN KEY ("stillageId") REFERENCES "Stillage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "inventoryId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Transaction_inventoryId_fkey" FOREIGN KEY ("inventoryId") REFERENCES "Inventory" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "admin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password", "updatedAt", "username") SELECT "createdAt", "email", "id", "name", "password", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
