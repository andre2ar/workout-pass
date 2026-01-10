import {CheckIn} from "../../generated/prisma/client";
import {ICheckInsRepository} from "@/repositories/CheckIn/ICheckInsRepository";
import {IGymsRepository} from "@/repositories/Gym/IGymsRepository";
import {ResourceNotFoundError} from "@/useCases/errors/ResourceNotFoundError";

interface CheckInUseCaseRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInUseCaseResponse {
    checkIn: CheckIn
}

export class CheckInUseCase {
    constructor(
        private checkInsRepository: ICheckInsRepository,
        private gymsRepository: IGymsRepository
    ) {
    }

    async execute({userId, gymId}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId);
        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const checkInOnSameDay = await this.checkInsRepository.findByUseIdOnDate(userId, new Date());
        if (checkInOnSameDay) {
            throw new Error('You already checked in today')
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return { checkIn };
    }
}