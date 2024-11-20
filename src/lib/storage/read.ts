import prisma from "../prismaClient";

export default async function getStorages() {
  try {
    return await prisma.storage.findMany({
      include: {
        inventories: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch stillages:", error);
    throw new Error("Failed to fetch stillages. Please try again later.");
  }
}
