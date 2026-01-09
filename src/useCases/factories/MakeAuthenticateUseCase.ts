import {PrismaUsersRepository} from "@/repositories/User/PrismaUsersRepository";
import {AuthenticateUseCase} from "@/useCases/AuthenticateUseCase";

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository();

    return new AuthenticateUseCase(usersRepository);
}