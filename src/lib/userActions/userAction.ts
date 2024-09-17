"use server";
import bcrypt from "bcrypt";
import prisma from "../prismaClient";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
const ITEMS_PER_PAGE = 10;

export async function createUser({
  username,
  password,
  name,
  email,
  image,
}: any) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        email,
      },
    });

    return user;
  } catch (error) {
    throw new Error("Unable to create user");
  }
}

export const getUser = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (err) {
    throw new Error("Unable to get user");
  }
};

export const getUsers = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  noStore();
  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { username: { contains: query } },
          { email: { contains: query } },
          { name: { contains: query } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: offset,
      take: ITEMS_PER_PAGE,
    });
    return users;
  } catch (err) {
    throw new Error("Unable to get users");
  }
};

export const getCountQueryUsers = async (query: string) => {
  noStore();
  try {
    const users = await prisma.user.count({
      where: {
        OR: [
          { username: { contains: query } },
          { email: { contains: query } },
          { name: { contains: query } },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const totalPages = Math.ceil(Number(users) / ITEMS_PER_PAGE);

    return totalPages;
  } catch (err) {
    throw new Error("Unable to get users");
  }
};

export const updateUser = async ({
  id,
  username,
  email,
  name,
}: {
  id: string;
  username?: string;
  email?: string;
  name?: string;
}) => {
  try {
    const updateUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        email,
        name,
      },
    });
    return updateUser;
  } catch (err) {
    throw new Error("Unable to update user");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id,
      },
    });
    return deleteUser;
  } catch (err) {
    throw new Error("Unable to delete user");
  }
};
