"use server";
import prisma from "../prismaClient";
import { CreateStillage } from "@/db/interfaces/create-types";
import { revalidatePath } from "next/cache";

export async function createStillage({
  name,
  columns,
  shelves,
  type,
}: CreateStillage) {
  try {
    const stillage = await prisma.stillage.create({
      data: {
        name,
        columns,
        shelves,
        type,
      },
    });
    revalidatePath("/stillage");

    return stillage;
  } catch (error) {
    throw new Error("STILLAGE_CREATE_FAILED");
  }
}

export async function editStillage(data: CreateStillage & { id: number }) {
  try {
    const { name, columns, shelves, id, type } = data;

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
        throw new Error(
          `Невъзможна редакция.В следните клетки има материали: ${cellsWithInventory
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
        type,
      },
    });
    revalidatePath("/stillage");

    return stillage;
  } catch (error: any) {
    const errorMessage = error?.message || "STILAGE_EDIT_FAILED";
    throw new Error(errorMessage);
  }
}

export async function deleteStillage(id: number) {
  try {
    const stillageWithInventories = await prisma.stillage.findUnique({
      where: { id: id },
      include: {
        inventories: true,
      },
    });

    if (!stillageWithInventories) {
      throw new Error(`STILLAGE_NOT_FOUND`);
    }
    if (stillageWithInventories?.inventories.length > 0) {
      throw new Error(`STILLAGE_NOT_EMPTY`);
    }

    const deletedStillage = await prisma.stillage.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/stillage");

    return {
      success: true,
      message: `Stillage with ID ${id} deleted successfully.`,
      deletedStillage,
    };
  } catch (error: any) {
    const errorMessage = error?.message || "STILAGE_DELETE_FAILED";
    throw new Error(errorMessage);
  }
}
