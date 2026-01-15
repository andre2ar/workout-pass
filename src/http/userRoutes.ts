import {FastifyInstance} from "fastify";
import {RegisterController} from "@/http/controllers/users/RegisterController";
import {AuthenticateController} from "@/http/controllers/users/AuthenticateController";
import {ProfileController} from "@/http/controllers/users/ProfileController";
import {verifyJWT} from "@/http/middlewares/VerifyJWT";
import {RefreshTokenController} from "@/http/controllers/users/RefreshTokenController";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', RegisterController);
    app.post('/sessions', AuthenticateController);

    app.patch('/token/refresh', RefreshTokenController);

    app.get('/me', {onRequest: [verifyJWT]}, ProfileController);
}