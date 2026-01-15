import {FastifyInstance} from "fastify";
import {verifyJWT} from "@/http/middlewares/VerifyJWT";
import {NearbyGymsController} from "@/http/controllers/gyms/NearbyGymsController";
import {SearchGymController} from "@/http/controllers/gyms/SearchGymsController";
import {CreateGymController} from "@/http/controllers/gyms/CreateGymController";
import {verifyUserRole} from "@/http/middlewares/VerifyUserRole";

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);

    app.get('/gyms/search', SearchGymController);
    app.get('/gyms/nearby', NearbyGymsController);

    app.post('/gyms', {onRequest: verifyUserRole('ADMIN')}, CreateGymController);
}