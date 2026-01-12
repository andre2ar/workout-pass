import {CheckInUseCase} from "@/useCases/CheckInUseCase";
import {PrismaCheckInsRepository} from "@/repositories/CheckIn/PrismaCheckInsRepository";
import {PrismaGymsRepository} from "@/repositories/Gym/PrismaGymsRepository";

export function makeCheckInUseCase() {
    const checkInRepository = new PrismaCheckInsRepository();
    const gymRepository = new PrismaGymsRepository();

    return new CheckInUseCase(checkInRepository, gymRepository);
}