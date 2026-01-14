import {z} from "zod";
import {FastifyRequest, FastifyReply} from "fastify";
import {makeValidateCheckInUseCase} from "@/useCases/factories/MakeValidateCheckInUseCase";

export async function ValidateCheckInController(request: FastifyRequest, reply: FastifyReply ) {
    const validateCheckInParamsSchema = z.object({
        checkInId: z.string()
    });

    const {checkInId} = validateCheckInParamsSchema.parse(request.params);

    const validateCheckInUseCase = makeValidateCheckInUseCase();

    const { checkIn } = await validateCheckInUseCase.execute({
        checkInId
    });

    return reply.status(200).send({
        checkIn
    });
}