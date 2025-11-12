import {prisma} from "@/lib/prisma";
import {hash} from "bcryptjs";

interface CreateUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export const createUserUseCase = async ({
    name,
    email,
    password
}: CreateUserUseCaseRequest) => {
    const userWithSameEmail = await prisma.user.findUnique({
        where: {email}
    })
    if(userWithSameEmail) {
        throw new Error('Email already in use')
    }

    const passwordHash = await hash(password, 6);
    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: passwordHash
        }
    })
}