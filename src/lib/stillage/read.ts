import prisma from "../prismaClient";

export default async function getStillages() {
  try {
    return await prisma.stillage.findMany({
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
        inventories: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch stillages:", error);
    throw new Error("Failed to fetch stillages. Please try again later.");
  }
}

export async function getStillageByType(type: string) {
  try {
    return await prisma.stillage.findMany({
      where: {
        type,
      },
      include: {
        cells: true,
        inventories: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch stillages:", error);
    throw new Error("Failed to fetch stillages. Please try again later.");
  }
}

export async function suggestStillage(
  materialType: string,
  formData: {
    plavka: string;
    nPorchka: string;
    comment: string;
    broyBezOtk: string;
    broySOtk: string;
  }
) {
  try {
    const stillage = await prisma.stillage.findFirst({
      where: {
        type: materialType,
      },
      include: {
        cells: {
          include: {
            inventories: true,
          },
        },
      },
    });
    return stillage;
  } catch (error: any) {
    const errorMessage = error?.message || "STILLAGE_NOT_FOUND";
    throw new Error(errorMessage);
  }
}
