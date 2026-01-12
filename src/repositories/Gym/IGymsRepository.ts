import {Gym} from "../../../generated/prisma/client";
import {GymCreateInput} from "../../../generated/prisma/models/Gym";

export interface FindManyNearbyParams {
    latitude: number;
    longitude: number;
}

export interface IGymsRepository {
    findById(id: string): Promise<Gym | null>;
    findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
    create(data: GymCreateInput): Promise<Gym>;
    searchMany(query: string, page: number): Promise<Gym[]>
}