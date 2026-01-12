import {PrismaGymsRepository} from "@/repositories/Gym/PrismaGymsRepository";
import {CreateGymUseCase} from "@/useCases/CreateGymUseCase";

export function makeCreateGymUseCase() {
    const gymRepository = new PrismaGymsRepository();

    return new CreateGymUseCase(gymRepository);
}