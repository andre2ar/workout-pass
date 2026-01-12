import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/CheckIn/InMemoryCheckInsRepository";
import {GetUserMetricsUseCase} from "@/useCases/GetUserMetricsUseCase";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("GetUserMetricsUseCase", () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new GetUserMetricsUseCase(checkInsRepository);
    });

    it('should be able get user metrics', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        });

        await checkInsRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01',
        });

        const { checkInsCount } = await sut.execute({
            userId: 'user-01',
        });

        expect(checkInsCount).toEqual(2);
    });
});