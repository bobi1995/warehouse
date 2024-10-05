/*
  Warnings:

  - You are about to drop the column `size_x` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `size_y` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `size_z` on the `Cell` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Material` table. All the data in the column will be lost.
  - Added the required column `size_height` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size_length` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size_width` to the `Cell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size_height` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size_length` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size_width` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cell" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "stillageId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "size_length" REAL NOT NULL,
    "size_height" REAL NOT NULL,
    "size_width" REAL NOT NULL,
    "max_weight" REAL NOT NULL,
    "isolator" BOOLEAN NOT NULL,
    CONSTRAINT "Cell_stillageId_fkey" FOREIGN KEY ("stillageId") REFERENCES "Stillage" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cell" ("code", "id", "isolator", "max_weight", "stillageId") SELECT "code", "id", "isolator", "max_weight", "stillageId" FROM "Cell";
DROP TABLE "Cell";
ALTER TABLE "new_Cell" RENAME TO "Cell";
CREATE TABLE "new_Material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size_length" REAL NOT NULL,
    "size_height" REAL NOT NULL,
    "size_width" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "type" TEXT NOT NULL
);
INSERT INTO "new_Material" ("id") SELECT "id" FROM "Material";
DROP TABLE "Material";
ALTER TABLE "new_Material" RENAME TO "Material";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
