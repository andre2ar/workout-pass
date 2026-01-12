import {FastifyInstance} from "fastify";
import {RegisterController} from "@/http/controllers/RegisterController";
import {AuthenticateController} from "@/http/controllers/AuthenticateController";
import {ProfileController} from "@/http/controllers/ProfileController";
import {verifyJWT} from "@/http/middlewares/VerifyJWT";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', RegisterController);
    app.post('/sessions', AuthenticateController);

    app.get('/me', {onRequest: [verifyJWT]}, ProfileController);
}