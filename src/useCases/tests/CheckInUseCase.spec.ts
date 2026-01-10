import { expect, describe, it, beforeEach } from "vitest";
import { CheckInUseCase } from "@/useCases/CheckInUseCase";
import { InMemoryCheckInsRepository } from "@/repositories/CheckIn/InMemoryCheckInsRepository";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("CheckInUseCase", () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new CheckInUseCase(checkInsRepository);
    });

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
});