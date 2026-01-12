import {PrismaGymsRepository} from "@/repositories/Gym/PrismaGymsRepository";
import {SearchGymsUseCase} from "@/useCases/SearchGymsUseCase";

export function makeSearchGymsUseCase() {
    const gymRepository = new PrismaGymsRepository();

    return new SearchGymsUseCase(gymRepository);
}
