import {PrismaClient} from '../../generated/prisma/client'
import {config} from "@/config";

export const prisma = new PrismaClient({
    log: config.NODE_ENV === 'dev' ? ['query'] : []
})