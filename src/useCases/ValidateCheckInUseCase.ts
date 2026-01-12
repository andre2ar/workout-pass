import {CheckIn} from "../../generated/prisma/client";
import {ICheckInsRepository} from "@/repositories/CheckIn/ICheckInsRepository";
import {ResourceNotFoundError} from "@/useCases/errors/ResourceNotFoundError";
import dayjs from "dayjs";
import {LateCheckInValidationError} from "@/useCases/errors/LateCheckInValidationError";

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

        const minutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            'minutes',
        );

        if (minutesFromCheckInCreation > 20) {
            throw new LateCheckInValidationError();
        }

        checkIn.validated_at = new Date();

        await this.checkInsRepository.save(checkIn);

        return { checkIn };
    }
}