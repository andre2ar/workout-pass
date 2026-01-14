import {FindManyNearbyParams, IGymsRepository} from "@/repositories/Gym/IGymsRepository";
import {GymCreateInput} from "../../../generated/prisma/models/Gym";
import {Gym} from "../../../generated/prisma/client";
import {prisma} from "@/lib/prisma";
import {config} from "@/config";

export class PrismaGymsRepository implements IGymsRepository{
    async create(data: GymCreateInput): Promise<Gym> {
        return prisma.gym.create({data});
    }

    async findById(id: string): Promise<Gym | null> {
        return prisma.gym.findUnique({where: {id}});
    }

    async findManyNearby({ latitude, longitude }: FindManyNearbyParams): Promise<Gym[]> {
        const schema = new URL(config.DATABASE_URL).searchParams.get('schema') || 'public';

        return prisma.$queryRawUnsafe<Gym[]>(`
            SELECT * FROM "${schema}".gyms
            WHERE ( 6371 * acos( cos( radians($1) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians($2) ) + sin( radians($1) ) * sin( radians( latitude ) ) ) ) <= 10
        `, latitude, longitude);
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        return prisma.gym.findMany({
            where: {name: {contains: query}},
            take: 20,
            skip: (page - 1) * 20
        });
    }

}