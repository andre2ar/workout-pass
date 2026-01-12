import {PrismaCheckInsRepository} from "@/repositories/CheckIn/PrismaCheckInsRepository";
import {FetchUserCheckInsHistoryUseCase} from "@/useCases/FetchUserCheckInsHistoryUseCase";

export function makeFetchUserCheckInsHistoryUseCase() {
    const checkInRepository = new PrismaCheckInsRepository();

    return new FetchUserCheckInsHistoryUseCase(checkInRepository);
}
