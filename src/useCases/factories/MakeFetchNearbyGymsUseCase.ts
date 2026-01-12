import {FetchNearbyGymsUseCase} from "@/useCases/FetchNearbyGymsUseCase";
import {PrismaGymsRepository} from "@/repositories/Gym/PrismaGymsRepository";

export function MakeFetchNearbyGymsUseCase() {
    return new FetchNearbyGymsUseCase(new PrismaGymsRepository());
}
