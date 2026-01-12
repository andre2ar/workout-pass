import {CheckIn} from "../../generated/prisma/client";
import {ICheckInsRepository} from "@/repositories/CheckIn/ICheckInsRepository";

interface FetchUserCheckInHistoryUseCaseRequest {
    userId: string;
    page: number;
}

interface FetchUserCheckInHistoryUseCaseResponse {
    checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
    constructor(
        private checkInsRepository: ICheckInsRepository,
    ) {
    }

    async execute({userId, page}: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
        const checkIns= await this.checkInsRepository.findManyByUserId(userId, page);

        return { checkIns };
    }
}