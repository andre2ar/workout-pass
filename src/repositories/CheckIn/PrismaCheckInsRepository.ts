import {ICheckInsRepository} from "@/repositories/CheckIn/ICheckInsRepository";
import {CheckInUncheckedCreateInput} from "../../../generated/prisma/models/CheckIn";
import {CheckIn} from "../../../generated/prisma/client";
import {prisma} from "@/lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckInsRepository implements ICheckInsRepository {
    async create(data: CheckInUncheckedCreateInput): Promise<CheckIn> {
        return prisma.checkIn.create({
            data
        });
    }

    async findByUseIdOnDate(user_id: string, date: Date): Promise<CheckIn | null> {
        const startOfTheDay = dayjs(date).startOf('date');
        const endOfTheDay = dayjs(date).endOf('date');

        return prisma.checkIn.findFirst({
            where: {
                user_id,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        });
    }

    async countByUserId(userId: string): Promise<number> {
        return prisma.checkIn.count({
            where: {user_id: userId}
        });
    }

    async findById(id: string): Promise<CheckIn | null> {
        return prisma.checkIn.findUnique({
            where: {id}
        });
    }

    async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
        return prisma.checkIn.findMany({
            where: {user_id: userId},
            skip: (page - 1) * 20,
            take: 20
        });
    }

    async save(checkIn: CheckIn): Promise<CheckIn> {
        return prisma.checkIn.update({
            where: {
                id: checkIn.id
            },
            data: checkIn
        });
    }
}