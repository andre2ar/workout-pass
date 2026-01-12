import {FindManyNearbyParams, IGymsRepository} from "@/repositories/Gym/IGymsRepository";
import {Gym} from "../../../generated/prisma/client";
import {GymCreateInput} from "generated/prisma/models";
import {getDistanceBetweenCoordinates} from "@/utils/GetDistanceBetweenTwoCoordinates";
import {Decimal} from "../../../generated/prisma/internal/prismaNamespace";

export class InMemoryGymsRepository implements IGymsRepository {
    public gyms: Gym[] = [];

    async findById(id: string): Promise<Gym | null> {
        const gym = this.gyms.find(gym => gym.id === id);

        return gym ?? null;
    }

    async create(data: GymCreateInput): Promise<Gym> {
        const gym: Gym = {
            id: data.id ?? crypto.randomUUID(),
            name: data.name,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Decimal(data.latitude.toString()),
            longitude: new Decimal(data.longitude.toString()),
            created_at: new Date(),
        }

        this.gyms.push(gym);

        return gym;
    }

    async searchMany(query: string, page: number): Promise<Gym[]> {
        const limit = 20;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return this.gyms.filter(gym => gym.name.toLowerCase().includes(query.toLowerCase()))
            .slice(startIndex, endIndex);
    }

    async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
        return this.gyms.filter(gym => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longitude },
                { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber() }
            );

            return distance < 10;
        })
    }
}