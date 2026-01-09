import {expect, describe, it, beforeEach} from "vitest";
import {CreateUserUseCase} from "@/useCases/CreateUserUseCase";
import {InMemoryUsersRepository} from "@/repositories/User/InMemoryUsersRepository";
import {compare} from "bcryptjs";
import {UserAlreadyExistsError} from "@/useCases/errors/UserAlreadyExistsError";

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("CreateUserUseCase", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new CreateUserUseCase(usersRepository);
    });

    it('should be able to register', async () => {
        const password = '123456';
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password,
        });

        expect(user.id).toEqual(expect.any(String));
    });


    it('should hash user password upon registration', async () => {
        const password = '123456';
        const { user } = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password,
        });

        expect(user.password_hash).not.toEqual(password);
        const isPasswordCorrectlyHashed = await compare(password, user.password_hash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register with existing email', async () => {
        const email = 'johndoe@example.com';
        await sut.execute({
            name: 'John Doe',
            email,
            password: '123456',
        });

        await expect(() => sut.execute({
            name: 'John Doe',
            email,
            password: '123456',
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
})