import {IGymsRepository} from "@/repositories/Gym/IGymsRepository";
import {Gym} from "../../../generated/prisma/client";

export class InMemoryGymsRepository implements IGymsRepository {
    public gyms: Gym[] = [];

    async findById(id: string): Promise<Gym | null> {
        const gym = this.gyms.find(gym => gym.id === id);

        return gym ?? null;
    }
}