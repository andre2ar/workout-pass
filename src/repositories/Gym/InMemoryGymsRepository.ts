import {IGymsRepository} from "@/repositories/Gym/IGymsRepository";
import {Gym} from "../../../generated/prisma/client";
import { GymCreateInput } from "generated/prisma/models";
import {Decimal} from "@prisma/client/runtime/library";

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
}