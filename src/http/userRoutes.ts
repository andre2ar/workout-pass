import {FastifyInstance} from "fastify";
import {RegisterController} from "@/http/controllers/users/RegisterController";
import {AuthenticateController} from "@/http/controllers/users/AuthenticateController";
import {ProfileController} from "@/http/controllers/users/ProfileController";
import {verifyJWT} from "@/http/middlewares/VerifyJWT";

export async function userRoutes(app: FastifyInstance) {
    app.post('/users', RegisterController);
    app.post('/sessions', AuthenticateController);

    app.get('/me', {onRequest: [verifyJWT]}, ProfileController);
}