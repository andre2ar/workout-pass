import {PrismaClient} from '../../generated/prisma/client'
import {config} from "@/config";
import { PrismaPg } from '@prisma/adapter-pg'

const schema = new URL(config.DATABASE_URL).searchParams.get('schema') || 'public';

const adapter = new PrismaPg(
    { connectionString: config.DATABASE_URL },
    { schema },
);

export const prisma = new PrismaClient({
    log: config.NODE_ENV === 'dev' ? ['query'] : [],
    adapter
});