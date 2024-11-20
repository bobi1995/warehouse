"use server";
import prisma from "../prismaClient";
import { revalidatePath } from "next/cache";

export async function createStorage({ name }: { name: string }) {
  try {
    const stillage = await prisma.storage.create({
      data: {
        name,
      },
    });
    revalidatePath("/stillage");

    return stillage;
  } catch (error) {
    throw new Error("STORAGE_CREATE_FAILED");
  }
}

export async function editStorage({ name, id }: { name: string; id: number }) {
  try {
    const storage = await prisma.storage.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
    revalidatePath("/stillage");

    return storage;
  } catch (error) {
    throw new Error("STORAGE_EDIT_FAILED");
  }
}

export async function deleteStorage(id: number) {
  try {
    await prisma.storage.delete({
      where: {
        id,
      },
    });
    revalidatePath("/stillage");
  } catch (error) {
    throw new Error("STORAGE_DELETE_FAILED");
  }
}
