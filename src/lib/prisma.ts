import {PrismaClient} from '../../generated/prisma/client'
import {config} from "@/config";
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

export const prisma = new PrismaClient({
    log: config.NODE_ENV === 'dev' ? ['query'] : [],
    adapter
})