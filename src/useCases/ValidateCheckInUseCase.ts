import {CheckIn} from "../../generated/prisma/client";
import {ICheckInsRepository} from "@/repositories/CheckIn/ICheckInsRepository";
import {ResourceNotFoundError} from "@/useCases/errors/ResourceNotFoundError";

interface ValidateCheckInUseCaseRequest {
    checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
    checkIn: CheckIn
}

export class ValidateCheckInUseCase {
    constructor(
        private checkInsRepository: ICheckInsRepository,
    ) {
    }

    async execute({checkInId}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId);
        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn);

        return { checkIn };
    }
}