import {Gym} from "../../../generated/prisma/client";
import {GymCreateInput} from "../../../generated/prisma/models/Gym";

export interface IGymsRepository {
    findById(id: string): Promise<Gym | null>;
    create(data: GymCreateInput): Promise<Gym>;
    searchMany(query: string, page: number): Promise<Gym[]>
}