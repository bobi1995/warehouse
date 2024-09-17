import prisma from "../prismaClient";

export default async function getStillages() {
  return prisma.stillage.findMany({
    include: {
      cells: true,
      inventories: true,
    },
  });
}
