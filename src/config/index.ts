import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'production', 'test']).default('production'),
    PORT: z.coerce.number().default(3333),
    DATABASE_URL: z.string(),
})

const env = envSchema.safeParse(process.env)

if(!env.success) {
    console.log("Invalid environment variables", z.treeifyError(env.error))
    throw new Error('Invalid environment variables')
}

export const config = env.data