import {z} from "zod";
import {FastifyRequest, FastifyReply} from "fastify";
import {makeFetchUserCheckInsHistoryUseCase} from "@/useCases/factories/MakeFetchUserCheckInsHistoryUseCase";

export async function HistoryCheckInController(request: FastifyRequest, reply: FastifyReply ) {
    const checkHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    });

    const {page} = checkHistoryQuerySchema.parse(request.query);

    const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();

    const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
        userId: request.user.sub,
        page
    });

    return reply.status(200).send({
        checkIns
    });
}