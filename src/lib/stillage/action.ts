"use server";
import prisma from "../prismaClient";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
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
    throw new Error("Unable to create stillage");
  }
}
