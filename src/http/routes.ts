import {FastifyInstance} from "fastify";
import {registerController} from "@/http/controllers/RegisterController";

export async function appRoutes(app: FastifyInstance) {
    app.post('/users', registerController);
}