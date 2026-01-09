import {z} from "zod";
import {FastifyRequest, FastifyReply} from "fastify";
import {PrismaUsersRepository} from "@/repositories/User/PrismaUsersRepository";
import {AuthenticateUseCase} from "@/useCases/AuthenticateUseCase";
import {InvalidCredentialsError} from "@/useCases/errors/InvalidCredentialsError";

export async function AuthenticateController(request: FastifyRequest, reply: FastifyReply ) {
    const registerBodySchema = z.object({
        email: z.email(),
        password: z.string().min(6)
    });

    const { email, password } = registerBodySchema.parse(request.body);
    const prismaUsersRepository = new PrismaUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository)
    try {
        await authenticateUseCase.execute({
            email,
            password
        });
    } catch (e) {
        if(e instanceof InvalidCredentialsError) {
            return reply.status(401).send({
                message: e.message
            })
        }

        throw e
    }

    return reply.status(200).send()
}