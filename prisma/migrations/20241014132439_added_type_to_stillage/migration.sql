-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Stillage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "shelves" INTEGER NOT NULL,
    "columns" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'SS,St,Zn,Al'
);
INSERT INTO "new_Stillage" ("columns", "id", "name", "shelves") SELECT "columns", "id", "name", "shelves" FROM "Stillage";
DROP TABLE "Stillage";
ALTER TABLE "new_Stillage" RENAME TO "Stillage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
