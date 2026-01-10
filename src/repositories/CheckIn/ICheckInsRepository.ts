import { CheckInUncheckedCreateInput } from "../../../generated/prisma/models/CheckIn";
import {CheckIn} from "../../../generated/prisma/client";

export interface ICheckInsRepository {
    create(data: CheckInUncheckedCreateInput): Promise<CheckIn>;
}