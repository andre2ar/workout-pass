import {z} from "zod";
import {FastifyRequest, FastifyReply} from "fastify";
import {InvalidCredentialsError} from "@/useCases/errors/InvalidCredentialsError";
import {makeAuthenticateUseCase} from "@/useCases/factories/MakeAuthenticateUseCase";

export async function AuthenticateController(request: FastifyRequest, reply: FastifyReply ) {
    const registerBodySchema = z.object({
        email: z.email(),
        password: z.string().min(6)
    });

    const { email, password } = registerBodySchema.parse(request.body);
    const authenticateUseCase = makeAuthenticateUseCase()
    try {
        const { user } = await authenticateUseCase.execute({
            email,
            password
        });

        const token = await reply.jwtSign(
            {
                role: user.role
            },
            {
                sign: {
                    sub: user.id,
                }
            }
        );

        const refreshToken = await reply.jwtSign(
            {
                role: user.role
            },
            {
                sign: {
                    sub: user.id,
                    expiresIn: '7d'
                }
            }
        );

        return reply
            .setCookie('refreshToken', refreshToken, {
                path: '/',
                secure: true,
                httpOnly: true,
                sameSite: true,
            })
            .status(200).send({
                token,
            })
    } catch (e) {
        if(e instanceof InvalidCredentialsError) {
            return reply.status(401).send({
                message: e.message
            })
        }

        throw e
    }
}