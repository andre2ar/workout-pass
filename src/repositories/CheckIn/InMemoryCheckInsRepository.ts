import {ICheckInsRepository} from "@/repositories/CheckIn/ICheckInsRepository";
import {CheckInUncheckedCreateInput} from "../../../generated/prisma/models/CheckIn";
import {CheckIn} from "../../../generated/prisma/client";
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements ICheckInsRepository {
    public checkIns: CheckIn[] = [];

    async create(data: CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkIn: CheckIn = {
            id: crypto.randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            created_at: new Date(),
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
        }

        this.checkIns.push(checkIn);

        return checkIn;
    }

    async findByUseIdOnDate(user_id: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        const checkIn = this.checkIns.find((checkIn) => {
            const checkInDate = dayjs(checkIn.created_at);
            const isOnSameDate = checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

            return checkIn.user_id === user_id && isOnSameDate;
        });

        return checkIn ?? null;
    }

    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        const limit = 20;
        const skip = (page - 1) * limit;

        return this.checkIns.filter((checkIn) => checkIn.user_id === userId)
            .slice(skip, skip + limit);
    }
}