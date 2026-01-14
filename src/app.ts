import fastify from 'fastify'
import {userRoutes} from "@/http/userRoutes";
import {config} from "@/config";
import {z, ZodError} from "zod";
import fastifyJwt from "@fastify/jwt";
import {gymsRoutes} from "@/http/gymsRoutes";
import {checkInsRoutes} from "@/http/checkInsRoutes";

export const app = fastify({
    logger: config.NODE_ENV === 'dev',
});

app.register(fastifyJwt, {
    secret: config.JWT_SECRET,
});

app.register(userRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

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