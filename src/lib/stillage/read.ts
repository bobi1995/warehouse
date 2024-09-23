import { unstable_noStore } from "next/cache";
import prisma from "../prismaClient";

export default async function getStillages() {
  // unstable_noStore();
  return prisma.stillage.findMany({
    include: {
      cells: true,
      inventories: true,
    },
  });
}
