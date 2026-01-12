import { expect, describe, it, beforeEach } from "vitest";
import {InMemoryGymsRepository} from "@/repositories/Gym/InMemoryGymsRepository";
import {FetchNearbyGymsUseCase} from "@/useCases/FetchNearbyGymsUseCase";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("FetchNearbyGymsUseCase", () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new FetchNearbyGymsUseCase(gymsRepository);
    });

    it('should be able to fetch for nearby gyms', async () => {
        await gymsRepository.create({
            name: 'Gym 01',
            description : 'Gym description',
            phone : '123456789',
            latitude : 0,
            longitude : 0
        });

        await gymsRepository.create({
            name: 'Far, far way gym',
            description : 'Gym description',
            phone : '123456789',
            latitude : 28.4408276,
            longitude : -81.4479087
        });

        const { gyms } = await sut.execute({
            userLatitude: 0,
            userLongitude: 0,
        });

        expect(gyms).toEqual(expect.any(Array));
        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({name: 'Gym 01'}),
        ])
    });
});