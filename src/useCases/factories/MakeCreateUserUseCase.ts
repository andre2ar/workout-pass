import {CreateUserUseCase} from "@/useCases/CreateUserUseCase";
import {PrismaUsersRepository} from "@/repositories/User/PrismaUsersRepository";

export function makeCreateUserUseCase() {
    const usersRepository = new PrismaUsersRepository();
    return new CreateUserUseCase(usersRepository);
}