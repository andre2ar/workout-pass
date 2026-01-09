import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryUsersRepository} from "@/repositories/User/InMemoryUsersRepository";
import {AuthenticateUseCase} from "@/useCases/AuthenticateUseCase";
import {hash} from "bcryptjs";
import {InvalidCredentialsError} from "@/useCases/errors/InvalidCredentialsError";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("AuthenticateUseCase", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateUseCase(usersRepository);
    });

    it('should be able to authenticate', async () => {
        const password = '123456';
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash(password, 6),
        })

        const {user} = await sut.execute({
            email: 'johndoe@example.com',
            password,
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should be able to authenticate with wrong email', async () => {
        const password = '123456';
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash(password, 6),
        })

        await expect(() => sut.execute({
            email: 'wrongemail@example.com',
            password,
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should be able to authenticate with wrong password', async () => {
        const password = '123456';
        await usersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password_hash: await hash(password, 6),
        })

        await expect(() => sut.execute({
            email: 'johndoe@example.com',
            password: 'wrongpassword',
        })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
