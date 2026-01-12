import 'dotenv/config';
import {Environment} from "vitest/environments";
import {randomUUID} from "node:crypto";
import {execSync} from "node:child_process";
import {PrismaClient} from "@prisma/client";

function generateDatabaseUrl(schema: string) {
    if (!process.env.DATABASE_URL) {
        throw new Error('DATABASE_URL is not defined');
    }

    const url = new URL(process.env.DATABASE_URL);

    url.searchParams.set('schema', schema);

    return url.toString();
}

export default <Environment>{
    name: 'prisma',
    viteEnvironment: 'ssr',
    async setup() {
        const schema = randomUUID();
        process.env.DATABASE_URL = generateDatabaseUrl(schema);

        execSync('npx prisma migrate deploy')
        return {
            async teardown() {
                const prisma = new PrismaClient();
                try {
                    await prisma.$executeRawUnsafe(`
                        DROP SCHEMA IF EXISTS "${schema}" CASCADE;
                    `);
                } finally {
                    await prisma.$disconnect();
                }
            }
        }
    }
}