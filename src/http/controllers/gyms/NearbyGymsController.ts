import {z} from "zod";
import {FastifyRequest, FastifyReply} from "fastify";
import {makeFetchNearbyGymsUseCase} from "@/useCases/factories/MakeFetchNearbyGymsUseCase";

export async function NearbyGymsController(request: FastifyRequest, reply: FastifyReply ) {
    const nearbyGymQuerySchema = z.object({
        latitude: z.coerce.number().refine(value => value >= -90 && value <= 90),
        longitude: z.coerce.number().refine(value => value >= -180 && value <= 180),
    });

    const { latitude, longitude } = nearbyGymQuerySchema.parse(request.query);

    const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

    const { gyms } = await fetchNearbyGymsUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude
    });

    return reply.status(200).send({
        gyms
    });
}