-- CreateTable
CREATE TABLE "Storage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inventory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "materialId" INTEGER NOT NULL,
    "stillageId" INTEGER,
    "cellId" INTEGER NOT NULL,
    "storageId" INTEGER,
    "lot" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "quan_dev" INTEGER NOT NULL DEFAULT 0,
    "quan_ok" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT,
    "desc" TEXT,
    "deliveryDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inboundDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Inventory_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Inventory_stillageId_fkey" FOREIGN KEY ("stillageId") REFERENCES "Stillage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Inventory_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Inventory_cellId_fkey" FOREIGN KEY ("cellId") REFERENCES "Cell" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Inventory" ("cellId", "comment", "deliveryDate", "desc", "id", "inboundDate", "lot", "materialId", "order", "quan_dev", "quan_ok", "stillageId") SELECT "cellId", "comment", "deliveryDate", "desc", "id", "inboundDate", "lot", "materialId", "order", "quan_dev", "quan_ok", "stillageId" FROM "Inventory";
DROP TABLE "Inventory";
ALTER TABLE "new_Inventory" RENAME TO "Inventory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
