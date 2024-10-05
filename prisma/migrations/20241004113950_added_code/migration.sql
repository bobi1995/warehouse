/*
  Warnings:

  - Added the required column `lesto_code` to the `Material` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size_length" REAL NOT NULL,
    "size_height" REAL NOT NULL,
    "size_width" REAL NOT NULL,
    "weight" REAL NOT NULL,
    "type" TEXT NOT NULL,
    "lesto_code" TEXT NOT NULL
);
INSERT INTO "new_Material" ("id", "size_height", "size_length", "size_width", "type", "weight") SELECT "id", "size_height", "size_length", "size_width", "type", "weight" FROM "Material";
DROP TABLE "Material";
ALTER TABLE "new_Material" RENAME TO "Material";
CREATE UNIQUE INDEX "Material_lesto_code_key" ON "Material"("lesto_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
