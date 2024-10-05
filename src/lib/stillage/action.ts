"use server";
import prisma from "../prismaClient";
import { CreateStillage } from "@/db/interfaces/create-types";

export async function createStillage({
  name,
  columns,
  shelves,
}: CreateStillage) {
  try {
    const stillage = await prisma.stillage.create({
      data: {
        name,
        columns,
        shelves,
      },
    });

    return stillage;
  } catch (error) {
    throw new Error("STILLAGE_CREATE_FAILED");
  }
}

export async function editStillage(data: CreateStillage & { id: number }) {
  try {
    const { name, columns, shelves, id } = data;

    const existingStillage = await prisma.stillage.findUnique({
      where: { id },
      include: { cells: true },
    });

    if (!existingStillage) {
      throw new Error("STILLAGE_NOT_FOUND");
    }

    const currentColumns = existingStillage.columns;
    const currentShelves = existingStillage.shelves;

    // Calculate the number of cells that would be created with the new config
    const newCellCount = columns * shelves;
    const currentCellCount = currentColumns * currentShelves;
    // If the new configuration has fewer cells, identify the cells to remove
    if (newCellCount < currentCellCount) {
      // Get the cells that need to be removed based on the column/shelf difference
      const cellsToRemove = existingStillage.cells.filter((cell) => {
        const [row, col] = cell.code.split("-").map(Number);
        return col >= columns; // Check if the column is beyond the new limit
      });

      // Check if any of these cells have associated inventories
      const cellsWithInventory = await prisma.inventory.findMany({
        where: {
          cellId: { in: cellsToRemove.map((cell) => cell.id) },
        },
      });

      // If there are any inventories, throw an error
      if (cellsWithInventory.length > 0) {
        console.log("here");
        throw new Error(
          `MANUAL:Невъзможна редакция.В следните клетки има материали: ${cellsWithInventory
            .map((inv) => inv.cellId)
            .join(", ")}`
        );
      }

      // If no inventories are found, remove the cells
      await prisma.cell.deleteMany({
        where: {
          id: { in: cellsToRemove.map((cell) => cell.id) },
        },
      });
    }

    const stillage = await prisma.stillage.update({
      where: { id },
      data: {
        name,
        columns,
        shelves,
      },
    });

    return stillage;
  } catch (error: any) {
    const errorMessage = error?.message || "STILAGE_EDIT_FAILED";
    throw new Error(errorMessage);
  }
}
