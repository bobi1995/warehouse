import { unstable_noStore } from "next/cache";
import prisma from "../prismaClient";

export default async function getStillages() {
  try {
    return await prisma.stillage.findMany({
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
