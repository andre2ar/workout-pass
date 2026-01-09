import {hash} from "bcryptjs";
import { IUsersRepository } from "@/repositories/User/IUsersRepository";
import {UserAlreadyExistsError} from "@/useCases/errors/UserAlreadyExistsError";
import {User} from "../../generated/prisma/client";

interface CreateUserUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

interface CreateUserUseCaseResponse {
    user: User
}

export class CreateUserUseCase {
    constructor(private usersRepository: IUsersRepository) {}
    
    async execute({
        name,
        email,
        password
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse>
    {
        const userWithSameEmail = await this.usersRepository.findByEmail(email);

        if(userWithSameEmail) {
            throw new UserAlreadyExistsError()
        }

        const passwordHash = await hash(password, 6);
        const user =  await this.usersRepository.create({
            name,
            email,
            password_hash: passwordHash
        })

        return {
            user,
        }
    }
}