import {Prisma, User} from "../../../generated/prisma/client";

export interface IUsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
}