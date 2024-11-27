"use server";
import prisma from "../prismaClient";
import { revalidatePath } from "next/cache";

export async function createMaterial(figure: string, formData: FormData) {
  const type = formData.get("type") as string;
  const size_length = formData.get("size_length")
    ? parseFloat(formData.get("size_length") as string)
    : 0;
  const size_height = formData.get("size_height")
    ? parseFloat(formData.get("size_height") as string)
    : 0;
  const size_width = formData.get("size_width")
    ? parseFloat(formData.get("size_width") as string)
    : 0;
  let weight = 0;
  const lesto_code = formData.get("lesto_code") as string;
  const desc = formData.get("desc") ? (formData.get("desc") as string) : null;
  const diameter = formData.get("diameter")
    ? parseFloat(formData.get("diameter") as string)
    : 0;

  if (figure === "sheet" || figure === "bar") {
    if (type === "AL") {
      weight = (2.78 * size_length * size_height * size_width) / (1000 * 1000);
    } else {
      weight = (7.9 * size_length * size_height * size_width) / (1000 * 1000);
    }
  } else if (figure === "cylinder") {
    if (type === "AL") {
      weight =
        (2.78 * Math.PI * Math.pow(diameter / 2, 2) * size_length) /
        (1000 * 1000);
    } else {
      weight =
        (7.9 * Math.PI * Math.pow(diameter / 2, 2) * size_length) /
        (1000 * 1000);
    }
  } else if (figure === "circle") {
    if (type === "AL") {
      weight =
        (2.78 * Math.PI * Math.pow(diameter / 2, 2) * size_height) /
        (1000 * 1000);
    } else {
      weight =
        (7.9 * Math.PI * Math.pow(diameter / 2, 2) * size_height) /
        (1000 * 1000);
    }
  }

  const rawFormData = {
    type,
    size_length,
    size_height,
    size_width,
    weight,
    lesto_code,
    desc,
    diameter,
    shape: figure,
  };
  console.log(rawFormData);

  try {
    const material = await prisma.material.create({
      data: rawFormData,
    });
    revalidatePath("/material");
    return material;
  } catch (error) {
    console.log(error);
    throw new Error("MATERIAL_CREATE_FAILED");
  }
}
export async function updateMaterial(
  figure: string,
  formData: FormData,
  id: number
) {
  const type = formData.get("type") as string;
  const size_length = formData.get("size_length")
    ? parseFloat(formData.get("size_length") as string)
    : 0;
  const size_height = formData.get("size_height")
    ? parseFloat(formData.get("size_height") as string)
    : 0;
  const size_width = formData.get("size_width")
    ? parseFloat(formData.get("size_width") as string)
    : 0;
  let weight = 0;
  const lesto_code = formData.get("lesto_code") as string;
  const desc = formData.get("desc") ? (formData.get("desc") as string) : null;
  const diameter = formData.get("diameter")
    ? parseFloat(formData.get("diameter") as string)
    : 0;
  const quantity = formData.get("quantity")
    ? parseInt(formData.get("quantity") as string)
    : 0;

  if (figure === "sheet" || figure === "bar") {
    if (type === "AL") {
      weight = (2.78 * size_length * size_height * size_width) / (1000 * 1000);
    } else {
      weight = (7.9 * size_length * size_height * size_width) / (1000 * 1000);
    }
  } else if (figure === "cylinder") {
    if (type === "AL") {
      weight =
        (2.78 * Math.PI * Math.pow(diameter / 2, 2) * size_length) /
        (1000 * 1000);
    } else {
      weight =
        (7.9 * Math.PI * Math.pow(diameter / 2, 2) * size_length) /
        (1000 * 1000);
    }
  } else if (figure === "circle") {
    if (type === "AL") {
      weight =
        (2.78 * Math.PI * Math.pow(diameter / 2, 2) * size_height) /
        (1000 * 1000);
    } else {
      weight =
        (7.9 * Math.PI * Math.pow(diameter / 2, 2) * size_height) /
        (1000 * 1000);
    }
  }

  const rawFormData = {
    type,
    size_length,
    size_height,
    size_width,
    weight,
    lesto_code,
    desc,
    diameter,
    shape: figure,
  };
  try {
    const material = await prisma.material.update({
      where: {
        id,
      },
      data: rawFormData,
    });
    revalidatePath("/material");
    return material;
  } catch (error) {
    console.log(error);
    throw new Error("MATERIAL_UPDATE_FAILED");
  }
}

export const deleteMaterial = async (id: number) => {
  try {
    const inventoryWithMat = await prisma.inventory.findMany({
      where: {
        material: { id },
      },
    });

    if (inventoryWithMat.length > 0) {
      throw new Error(`INVENTORY_NOT_EMPTY`);
    }

    const deleteMaterial = await prisma.material.delete({
      where: {
        id,
      },
    });
    revalidatePath("/material");
    return deleteMaterial;
  } catch (err) {
    throw new Error("MATERIAL_DELETE_FAILED");
  }
};
