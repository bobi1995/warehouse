import { PrismaClient } from "@prisma/client";

declare global {
  // Prevents TypeScript from complaining about the `global` object
  var prisma: PrismaClient | undefined;
}
const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
