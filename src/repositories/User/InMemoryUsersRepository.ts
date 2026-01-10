import {IUsersRepository} from "@/repositories/User/IUsersRepository";
import {UserCreateInput} from "../../../generated/prisma/models/User";
import {User} from "../../../generated/prisma/client";

export class InMemoryUsersRepository implements IUsersRepository
{
    public users: User[] = [];

    async findById(id: string): Promise<User | null> {
        const user = this.users.find(user => user.id === id);

        if (!user) {
            return null;
        }

        return user;
    }

    async create(data: UserCreateInput) {
        const user: User = {
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date(),
        }

        this.users.push(user);

        return user;
    }

    async findByEmail(email: string) {
        const user = this.users.find(user => user.email === email);

        if (!user) {
            return null;
        }

        return user;
    }

}