import {expect, describe, it} from "vitest";
import {CreateUserUseCase} from "@/useCases/CreateUserUseCase";
import {InMemoryUsersRepository} from "@/repositories/User/InMemoryUsersRepository";
import {compare} from "bcryptjs";
import {UserAlreadyExistsError} from "@/useCases/errors/UserAlreadyExistsError";

describe("CreateUserUseCase", () => {
    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new CreateUserUseCase(usersRepository);

        const password = '123456';
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password,
        });

        expect(user.id).toEqual(expect.any(String));
    });


    it('should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new CreateUserUseCase(usersRepository);

        const password = '123456';
        const { user } = await registerUseCase.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password,
        });

        expect(user.password_hash).not.toEqual(password);
        const isPasswordCorrectlyHashed = await compare(password, user.password_hash);
        expect(isPasswordCorrectlyHashed).toBe(true);
    });

    it('should not be able to register with existing email', async () => {
        const usersRepository = new InMemoryUsersRepository();
        const registerUseCase = new CreateUserUseCase(usersRepository);

        const email = 'johndoe@example.com';
        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456',
        });

        expect(() => registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456',
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
})