import {PrismaUsersRepository} from "@/repositories/User/PrismaUsersRepository";
import {GetUserProfileUseCase} from "@/useCases/GetUserProfileUseCase";

export function makeGetUserProfileUseCase() {
    const userRepository = new PrismaUsersRepository();

    return new GetUserProfileUseCase(userRepository);
}
