"use server";
import prisma from "../prismaClient";
import { CreateMaterial } from "@/db/interfaces/create-types";

export async function createMaterial({
  type,
  size_length,
  size_height,
  size_width,
  weight,
  lesto_code,
}: CreateMaterial) {
  try {
    const material = await prisma.material.create({
      data: {
        type,
        size_length,
        size_height,
        size_width,
        weight,
        lesto_code,
      },
    });

    return material;
  } catch (error) {
    throw new Error("MATERIAL_CREATE_FAILED");
  }
}
