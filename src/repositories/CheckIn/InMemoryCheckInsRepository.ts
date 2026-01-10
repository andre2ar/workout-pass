import {ICheckInsRepository} from "@/repositories/CheckIn/ICheckInsRepository";
import {CheckInUncheckedCreateInput} from "../../../generated/prisma/models/CheckIn";
import {CheckIn} from "../../../generated/prisma/client";

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
}