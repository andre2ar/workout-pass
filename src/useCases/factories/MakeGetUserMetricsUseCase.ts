import {PrismaCheckInsRepository} from "@/repositories/CheckIn/PrismaCheckInsRepository";
import {GetUserMetricsUseCase} from "@/useCases/GetUserMetricsUseCase";

export function makeGetUserMetricsUseCase() {
    const checkInRepository = new PrismaCheckInsRepository();

    return new GetUserMetricsUseCase(checkInRepository);
}
