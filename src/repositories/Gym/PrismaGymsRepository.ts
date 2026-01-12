import {FindManyNearbyParams, IGymsRepository} from "@/repositories/Gym/IGymsRepository";
import {GymCreateInput} from "../../../generated/prisma/models/Gym";
import {Gym} from "../../../generated/prisma/client";
import {prisma} from "@/lib/prisma";

export class PrismaGymsRepository implements IGymsRepository{
    async create(data: GymCreateInput): Promise<Gym> {
        return prisma.gym.create({data});
    }

    async findById(id: string): Promise<Gym | null> {
        return prisma.gym.findUnique({where: {id}});
    }

    async findManyNearby({latitude, longitude}: FindManyNearbyParams): Promise<Gym[]> {
        return prisma.$queryRaw<Gym[]>`
            SELECT * from gyms
            WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10        
        `;
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        return prisma.gym.findMany({
            where: {name: {contains: query}},
            take: 20,
            skip: (page - 1) * 20
        });
    }

}