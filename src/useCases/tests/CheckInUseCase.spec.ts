import {expect, describe, it, beforeEach, vi, afterEach} from "vitest";
import { CheckInUseCase } from "@/useCases/CheckInUseCase";
import { InMemoryCheckInsRepository } from "@/repositories/CheckIn/InMemoryCheckInsRepository";
import {InMemoryGymsRepository} from "@/repositories/Gym/InMemoryGymsRepository";
import {Decimal} from "@prisma/client/runtime/library";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("CheckInUseCase", () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository();
        gymsRepository = new InMemoryGymsRepository();
        sut = new CheckInUseCase(checkInsRepository, gymsRepository);

        gymsRepository.gyms.push({
            id: 'gym-01',
            name: 'Gym 01',
            description: null,
            phone: null,
            latitude: new Decimal(0),
            longitude: new Decimal(0),
            created_at: new Date(),
        })

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    })

    it('should be able to check in', async () => {
        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    it('should be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 12));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        });

        await expect(() => sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        })).rejects.toBeInstanceOf(Error);
    });

    it('should be able to check in twice in different days', async () => {
        vi.setSystemTime(new Date(2022, 0, 1, 12));

        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        });

        vi.setSystemTime(new Date(2022, 0, 2, 12));

        const { checkIn } = await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01',
            userLatitude: 0,
            userLongitude: 0,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });
});