import {expect, describe, it, beforeEach, vi, afterEach} from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/CheckIn/InMemoryCheckInsRepository";
import {ValidateCheckInUseCase} from "@/useCases/ValidateCheckInUseCase";
import {ResourceNotFoundError} from "@/useCases/errors/ResourceNotFoundError";
import {LateCheckInValidationError} from "@/useCases/errors/LateCheckInValidationError";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("ValidateCheckInUseCase", () => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository();
        sut = new ValidateCheckInUseCase(checkInsRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to to validate the check-in', async () => {
        const checkIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        const { checkIn: validatedCheckIn } = await sut.execute({
            checkInId: checkIn.id,
        });

        expect(validatedCheckIn.validated_at).toEqual(expect.any(Date));
        expect(validatedCheckIn.id).toEqual(checkIn.id);
    });

    it('should be able to to validate non-existent the check-in', async () => {
        await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        });

        await expect(sut.execute({
            checkInId: 'non-existent-check-in-id',
        })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

    it('should not be able to validate the check-in after 20 minutes it has been created', async () => {
        vi.setSystemTime(new Date(2026, 0, 12, 14));

        const checkIn = await checkInsRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01',
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21;
        vi.advanceTimersByTime(twentyOneMinutesInMs);


        await expect(sut.execute({
            checkInId: checkIn.id,
        })).rejects.toBeInstanceOf(LateCheckInValidationError);
    });
});