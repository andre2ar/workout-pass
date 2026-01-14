import {FetchNearbyGymsUseCase} from "@/useCases/FetchNearbyGymsUseCase";
import {PrismaGymsRepository} from "@/repositories/Gym/PrismaGymsRepository";

export function makeFetchNearbyGymsUseCase() {
    return new FetchNearbyGymsUseCase(new PrismaGymsRepository());
}
