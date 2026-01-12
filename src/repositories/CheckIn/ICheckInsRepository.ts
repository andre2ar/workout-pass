import { CheckInUncheckedCreateInput } from "../../../generated/prisma/models/CheckIn";
import {CheckIn} from "../../../generated/prisma/client";

export interface ICheckInsRepository {
    create(data: CheckInUncheckedCreateInput): Promise<CheckIn>;
    findByUseIdOnDate(user_id: string, date: Date): Promise<CheckIn | null>;
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
}