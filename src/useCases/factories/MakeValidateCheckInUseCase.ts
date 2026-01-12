import {ValidateCheckInUseCase} from "@/useCases/ValidateCheckInUseCase";
import {PrismaCheckInsRepository} from "@/repositories/CheckIn/PrismaCheckInsRepository";

export function makeValidateCheckInUseCase() {
    const checkInRepository = new PrismaCheckInsRepository();

    return new ValidateCheckInUseCase(checkInRepository);
}
