"use server";
import prisma from "../prismaClient";

export default async function getInventories() {
  try {
    return await prisma.inventory.findMany({
      include: {
        stillage: true,
        cell: true,
        transactions: true,
        material: true,
        storage: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch stillages:", error);
    throw new Error("INVENTORY_READ_FAILED");
  }
}

export async function getInventory(id: number) {
  try {
    return await prisma.inventory.findUnique({
      where: {
        id,
      },
      include: {
        stillage: {
          include: {
            cells: {
              include: {
                inventories: {
                  include: {
                    material: true,
                  },
                },
              },
            },
          },
        },
        cell: true,
        transactions: true,
        material: true,
        storage: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch stillages:", error);
    throw new Error("INVENTORY_READ_FAILED");
  }
}
export async function searchInventories(
  lesto_code: string | null,
  lot: string | null
) {
  try {
    return await prisma.inventory.findMany({
      where: {
        OR: [
          { material: { lesto_code: lesto_code || undefined } },
          { lot: lot || undefined },
        ],
      },
      include: {
        stillage: {
          include: {
            cells: {
              include: {
                inventories: true,
              },
            },
          },
        },
        cell: {
          include: {
            inventories: true,
          },
        },
        transactions: true,
        material: true,
        storage: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch inventories:", error);
    throw new Error("INVENTORY_READ_FAILED");
  }
}
