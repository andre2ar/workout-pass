import { CheckInUncheckedCreateInput } from "../../../generated/prisma/models/CheckIn";
import {CheckIn} from "../../../generated/prisma/client";

export interface ICheckInsRepository {
    create(data: CheckInUncheckedCreateInput): Promise<CheckIn>;
    save(checkIn: CheckIn): Promise<CheckIn>;
    findById(id: string): Promise<CheckIn | null>;
    findByUseIdOnDate(user_id: string, date: Date): Promise<CheckIn | null>;
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
    countByUserId(userId: string): Promise<number>;
}