-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "size_length" REAL,
    "size_height" REAL,
    "size_width" REAL,
    "weight" REAL,
    "quantity" REAL,
    "diameter" REAL,
    "type" TEXT NOT NULL,
    "desc" TEXT,
    "lesto_code" TEXT NOT NULL,
    "shape" TEXT NOT NULL DEFAULT 'sheet'
);
INSERT INTO "new_Material" ("desc", "diameter", "id", "lesto_code", "quantity", "size_height", "size_length", "size_width", "type", "weight") SELECT "desc", "diameter", "id", "lesto_code", "quantity", "size_height", "size_length", "size_width", "type", "weight" FROM "Material";
DROP TABLE "Material";
ALTER TABLE "new_Material" RENAME TO "Material";
CREATE UNIQUE INDEX "Material_lesto_code_key" ON "Material"("lesto_code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
