"use server";
import prisma from "../prismaClient";

export default async function getMaterials() {
  try {
    return await prisma.material.findMany({
      include: {
        inventories: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch stillages:", error);
    throw new Error("Failed to fetch stillages. Please try again later.");
  }
}
