import {z} from "zod";
import {FastifyRequest, FastifyReply} from "fastify";
import {makeCreateGymUseCase} from "@/useCases/factories/MakeCreateGymUseCase";

export async function CreateGymController(request: FastifyRequest, reply: FastifyReply ) {
    const createGymBodySchema = z.object({
        name: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value => value >= -90 && value <= 90),
        longitude: z.number().refine(value => value >= -180 && value <= 180),
    });

    const {name, description, phone, latitude, longitude} = createGymBodySchema.parse(request.body);

    const createGymUseCase = makeCreateGymUseCase();

    const { gym } = await createGymUseCase.execute({
        name,
        description,
        phone,
        latitude,
        longitude
    });

    return reply.status(201).send({
        gym
    });
}