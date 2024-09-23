"use server";
import { revalidatePath } from "next/cache";
import prisma from "../prismaClient";
import { CreateCell } from "@/db/interfaces/create-types";

export async function createCells(cells: CreateCell[]) {
  try {
    for (const cell of cells) {
      const { x, y, z, max_weight, isolator, stillageId, code } = cell;

      await prisma.cell.create({
        data: {
          size_x: x,
          size_y: y,
          size_z: z,
          max_weight,
          isolator,
          stillageId,
          code,
        },
      });
      revalidatePath("/edit-stillage");
    }
  } catch (error) {
    throw new Error("Unable to create stillage");
  }
}
