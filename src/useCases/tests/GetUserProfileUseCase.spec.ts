import {expect, describe, it, beforeEach} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/User/InMemoryUsersRepository";
import {GetUserProfileUseCase} from "@/useCases/GetUserProfileUseCase";
import {ResourceNotFoundError} from "@/useCases/errors/ResourceNotFoundError";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("GetUserProfileUseCase", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileUseCase(usersRepository);
    });

    it('should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: 'hashed_password',
        })
        const { user } = await sut.execute({
            userId: createdUser.id,
        });

        expect(user.name).toEqual('John Doe');
    });

    it('should not be able to get user profile', async () => {
        await expect(sut.execute({
            userId: 'wrong_user_id',
        })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
})