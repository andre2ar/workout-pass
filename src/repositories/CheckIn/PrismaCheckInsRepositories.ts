import {ICheckInsRepository} from "@/repositories/CheckIn/ICheckInsRepository";
import {CheckInUncheckedCreateInput} from "../../../generated/prisma/models/CheckIn";
import {CheckIn} from "../../../generated/prisma/client";
import {prisma} from "@/lib/prisma";

export class PrismaCheckInsRepositories implements ICheckInsRepository {
    create(data: CheckInUncheckedCreateInput): Promise<CheckIn> {
        return prisma.checkIn.create({
            data
        });
    }

    findByUseIdOnDate(user_id: string, date: Date): Promise<CheckIn | null> {
        return Promise.resolve(null);
    }
}