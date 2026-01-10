import {prisma} from "@/lib/prisma";
import {Prisma, User} from "../../../generated/prisma/client";
import {IUsersRepository} from "@/repositories/User/IUsersRepository";

export class PrismaUsersRepository implements IUsersRepository {
    findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {id}
        })
    }
    async create(data: Prisma.UserCreateInput) {
        return prisma.user.create({
            data
        });
    }

    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: {email}
        })
    }
}