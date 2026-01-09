import {FastifyInstance} from "fastify";
import {RegisterController} from "@/http/controllers/RegisterController";
import {AuthenticateController} from "@/http/controllers/Authenticate";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', RegisterController);
    app.post('/sessions', AuthenticateController);
}