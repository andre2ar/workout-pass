import fastify from 'fastify'
import {appRoutes} from "@/http/routes";
import {config} from "@/config";

export const app = fastify({
    logger: config.NODE_ENV === 'dev',
})

app.register(appRoutes)