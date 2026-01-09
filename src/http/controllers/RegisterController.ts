import {z} from "zod";
import {FastifyRequest, FastifyReply} from "fastify";
import {CreateUserUseCase} from "@/useCases/CreateUserUseCase";
import {PrismaUsersRepository} from "@/repositories/User/PrismaUsersRepository";
import {UserAlreadyExistsError} from "@/useCases/errors/UserAlreadyExistsError";

export async function RegisterController(request: FastifyRequest, reply: FastifyReply ) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.email(),
        password: z.string().min(6)
    });

    const {name, email, password} = registerBodySchema.parse(request.body);
    const prismaUsersRepository = new PrismaUsersRepository();
    const createUserUseCase = new CreateUserUseCase(prismaUsersRepository)

    let newUser = null;
    try {
        const { user } = await createUserUseCase.execute({
            name,
            email,
            password
        });
        newUser = user;
    } catch (e) {
        if(e instanceof UserAlreadyExistsError) {
            return reply.status(409).send({
                message: e.message
            })
        }

        throw e
    }

    return reply.status(201).send({
        user: {
            name: newUser.name,
            email: newUser.email
        }
    })
}