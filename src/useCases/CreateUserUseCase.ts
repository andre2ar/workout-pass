import {prisma} from "@/lib/prisma";
import {hash} from "bcryptjs";
import { IUsersRepository } from "@/repositories/User/IUsersRepository";
import {UserAlreadyExistsError} from "@/useCases/errors/UserAlreadyExistsError";

interface CreateUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}

    async execute({
        name,
        email,
        password
    }: CreateUserUseCaseRequest){
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if(userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const passwordHash = await hash(password, 6);
        await this.usersRepository.create({
            name,
            email,
            password_hash: passwordHash
        })
    }
}