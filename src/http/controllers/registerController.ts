import {z} from "zod";
import {FastifyRequest, FastifyReply} from "fastify";
import {createUserUseCase} from "@/use-cases/createUserUseCase";

export async function registerController(request: FastifyRequest, reply: FastifyReply ) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6)
    });

    const {name, email, password} = registerBodySchema.parse(request.body);

    try {
        await createUserUseCase({
            name,
            email,
            password
        })
    } catch {
        return reply.status(409).send()
    }

    return reply.status(201).send()
}