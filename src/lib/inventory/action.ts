"use server";
import { CreateInventory } from "@/db/interfaces/create-types";
import prisma from "../prismaClient";
import { revalidatePath } from "next/cache";
import printLabel from "@/utils/printLabel";
import labelBody from "@/db/label-body";

export async function createInventory({
  cellId,
  quan_dev,
  quan_ok,
  stillageId,
  materialId,
  lot,
  order,
  comment,
  desc,
  deliveryDate,
  inboundDate,
  storageId,
  email,
}: CreateInventory) {
  try {
    if (!quan_dev && !quan_ok) {
      throw new Error("QUANTITY_REQUIRED");
    }
    if (!email) {
      throw new Error("USER_REQUIRED");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("USER_REQUIRED");
    }

    const inventory = await prisma.inventory.create({
      data: {
        cellId,
        quan_dev,
        quan_ok,
        stillageId,
        materialId,
        lot,
        order,
        comment,
        desc,
        deliveryDate,
        inboundDate,
        storageId,
      },
    });

    const transaction = await prisma.transaction.create({
      data: {
        type: "inbound",
        inventoryId: inventory.id,
        userId: user?.id,
        materialId: materialId,
        quantity: (quan_ok ?? 0) + (quan_dev ?? 0),
      },
    });

    revalidatePath("/reference");

    return { inventory, transaction };
  } catch (error) {
    console.log(error);
    throw new Error("STILLAGE_CREATE_FAILED");
  }
}

export async function deleteInventory() {
  try {
    await prisma.inventory.deleteMany({});
    revalidatePath("/reference");

    return {
      success: true,
      message: `Stillage with ID  deleted successfully.`,
    };
  } catch (error: any) {
    const errorMessage = error?.message || "STILAGE_DELETE_FAILED";
    throw new Error(errorMessage);
  }
}

export async function editInventory(
  id: number,
  rawFormData: {
    lot: string;
    order: string;
    comment: string;
    quan_ok: number;
    quan_dev: number;
  }
) {
  try {
    const material = await prisma.inventory.update({
      where: {
        id,
      },
      data: rawFormData,
    });
    revalidatePath("/reference");
    return material;
  } catch (error) {
    console.log(error);
    throw new Error("INVENTORY_UPDATE_FAILED");
  }
}

export async function outbondInventory(
  outbounding_objects: {
    id: number;
    materialId: number;
    quantity: number;
  }[]
) {
  try {
    await Promise.all(
      outbounding_objects.map(async (obj) => {
        const inventory = await prisma.inventory.findUnique({
          where: {
            id: obj.id,
          },
          include: {
            material: true,
          },
        });
        if (!inventory) {
          throw new Error("INVENTORY_DELETE_FAILED");
        }

        await prisma.transaction.create({
          data: {
            type: "outbound",
            inventoryId: null,
            userId: "cm2ocvb4e0000b818m018q8zp",
            quantity: obj.quantity,
            materialId: obj.materialId,
          },
        });
        //If there are no quantity left, delete the inventory
        if (inventory.quan_ok + inventory.quan_dev - obj.quantity === 0) {
          await prisma.transaction.updateMany({
            where: {
              inventoryId: obj.id,
            },
            data: {
              inventoryId: null,
            },
          });
          await prisma.inventory.delete({
            where: {
              id: obj.id,
            },
          });
        } else {
          //If there are still quantity left, update the inventory and print label
          await prisma.inventory.update({
            where: {
              id: obj.id,
            },
            data: {
              quan_dev: inventory.quan_dev
                ? inventory.quan_dev - obj.quantity
                : 0,
              quan_ok:
                inventory.quan_ok > 0 ? inventory.quan_ok - obj.quantity : 0,
            },
          });
          await printLabel(
            labelBody(
              inventory.material?.lesto_code,
              inventory.material?.desc,
              inventory.order,
              inventory.lot,
              inventory.deliveryDate.toDateString(),
              (inventory.quan_dev + inventory.quan_ok).toString(),
              inventory.comment || "",
              inventory.id.toString()
            )
          );
        }
        await printLabel(
          labelBody(
            inventory.material?.lesto_code,
            inventory.material?.desc,
            inventory.order,
            inventory.lot,
            inventory.deliveryDate.toDateString(),
            obj.quantity.toString(),
            inventory.comment || "",
            inventory.id.toString()
          )
        );
      })
    );

    revalidatePath("/outbound");
    return {
      success: true,
      message: `Inventory deleted successfully`,
    };
  } catch (error) {
    console.log(error);
    throw new Error("INVENTORY_DELETE_FAILED");
  }
}

export async function shiftInventory(
  inventoryId: number,
  newStillage: number,
  newCell: number
) {
  try {
    await prisma.inventory.update({
      where: {
        id: inventoryId,
      },
      data: {
        stillageId: newStillage,
        cellId: newCell,
      },
    });
    revalidatePath("/shift");
    return {
      success: true,
      message: `Inventory rescheduled successfully`,
    };
  } catch (error) {
    console.log(error);
    throw new Error("INVENTORY_SHIFT_FAILED");
  }
}
