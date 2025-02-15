"use server";
import { unstable_noStore } from "next/cache";
import prisma from "../prismaClient";

const ITEMS_PER_PAGE = 10;

export async function getTransactions(currentPage: number, query: string) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  unstable_noStore();
  try {
    return await prisma.transaction.findMany({
      where: {
        OR: [
          { material: { lesto_code: { contains: query } } },
          { material: { desc: { contains: query } } },
        ],
      },
      include: {
        material: true,
        user: true,
      },
      orderBy: {
        date: "desc",
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    throw new Error("TRANSACTION_READ_FAILED");
  }
}

export async function getCountTransactions(query: string) {
  try {
    const transactions = await prisma.transaction.count({
      where: {
        OR: [
          { material: { lesto_code: { contains: query } } },
          { material: { desc: { contains: query } } },
        ],
      },
    });
    const totalPages = Math.ceil(Number(transactions) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Failed to fetch transactions count:", error);
    throw new Error("TRANSACTION_COUNT_FAILED");
  }
}
