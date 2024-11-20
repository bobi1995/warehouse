"use server";
import { revalidatePath } from "next/cache";
import prisma from "../prismaClient";
import { CreateCell } from "@/db/interfaces/create-types";

export async function createCells(cells: CreateCell[]) {
  try {
    for (const cell of cells) {
      const {
        id,
        size_length,
        size_height,
        size_width,
        max_weight,
        isolator,
        stillageId,
        code,
      } = cell;
      if (id) {
        await prisma.cell.update({
          where: {
            id,
          },
          data: {
            size_length,
            size_height,
            size_width,
            max_weight,
            isolator,
            stillageId,
            code,
          },
        });
      } else {
        await prisma.cell.create({
          data: {
            size_length,
            size_height,
            size_width,
            max_weight,
            isolator,
            stillageId,
            code,
          },
        });
      }
    }
    revalidatePath("/stillage");
    return { success: true, code: "CELL_SUCCESS" };
  } catch (error) {
    throw new Error("CELL_CREATE_FAILED");
  } finally {
    revalidatePath("/edit-stillage");
  }
}
