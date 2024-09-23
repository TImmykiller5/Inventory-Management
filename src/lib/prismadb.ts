import { PrismaClient } from "@prisma/client";

declare global {
	var prismadb: PrismaClient;
}

const prismadb = global.prismadb || new PrismaClient({ log: ["info"] });
if (process.env.NODE_ENV !== "production") global.prismadb = prismadb;


export default prismadb;