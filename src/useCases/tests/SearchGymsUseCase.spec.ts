import { expect, describe, it, beforeEach } from "vitest";
import {InMemoryGymsRepository} from "@/repositories/Gym/InMemoryGymsRepository";
import {SearchGymsUseCase} from "@/useCases/SearchGymsUseCase";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("SearchGymsUseCase", () => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new SearchGymsUseCase(gymsRepository);
    });

    it('should be able to search for gyms', async () => {
        await gymsRepository.create({
            name: 'Gym 01',
            description : 'Gym description',
            phone : '123456789',
            latitude : 0,
            longitude : 0
        });

        await gymsRepository.create({
            name: 'Gym 02',
            description : 'Gym description',
            phone : '123456789',
            latitude : 0,
            longitude : 0
        });

        const { gyms } = await sut.execute({
            query: 'Gym',
            page: 1,
        });

        expect(gyms).toEqual(expect.any(Array));
        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({name: 'Gym 01'}),
            expect.objectContaining({name: 'Gym 02'}),
        ])
    });

    it('should be able to fetch paginated gyms search', async () => {
        for(let i = 0; i < 22; i++) {
            await gymsRepository.create({
                name: `Gym ${i}`,
                description : 'Gym description',
                phone : '123456789',
                latitude : 0,
                longitude : 0
            });
        }

        const { gyms } = await sut.execute({
            query: 'Gym 20',
            page: 1,
        });

        expect(gyms).toEqual(expect.any(Array));
        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({name: `Gym 20`}),
        ])
    });
});