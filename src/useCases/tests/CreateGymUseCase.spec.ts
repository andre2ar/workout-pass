import {expect, describe, it, beforeEach} from "vitest";
import {InMemoryGymsRepository} from "@/repositories/Gym/InMemoryGymsRepository";
import {CreateGymUseCase} from "@/useCases/CreateGymUseCase";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("CreateGymUseCase", () => {
    beforeEach(() => {
        gymsRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(gymsRepository);
    });

    it('should be able to create gym', async () => {
        const { gym } = await sut.execute({
            name : 'Gym 01',
            description : 'Gym description',
            phone : '123456789',
            latitude : 0,
            longitude : 0
        });

        expect(gym.id).toEqual(expect.any(String));
    });

})