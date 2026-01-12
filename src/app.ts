import fastify from 'fastify'
import {appRoutes} from "@/http/routes";
import {config} from "@/config";
import {z, ZodError} from "zod";
import fastifyJwt from "@fastify/jwt";

export const app = fastify({
    logger: config.NODE_ENV === 'dev',
});

app.register(fastifyJwt, {
    secret: config.JWT_SECRET,
});

app.register(appRoutes);

app.setErrorHandler((error, _, reply) => {
    if(error instanceof ZodError) {
        return reply.status(400).send({
            message: "Validation error",
            issues: z.treeifyError(error)
        })
    }

    if (config.NODE_ENV === 'dev') {
        console.log(error)
    }

    return reply.status(500)
        .send({message: "Internal server error"})
});