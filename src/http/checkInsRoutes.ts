import {FastifyInstance} from "fastify";
import {verifyJWT} from "@/http/middlewares/VerifyJWT";
import {CreateCheckInController} from "@/http/controllers/checkIns/CreateCheckInController";
import {ValidateCheckInController} from "@/http/controllers/checkIns/ValidateCheckInController";
import {HistoryCheckInController} from "@/http/controllers/checkIns/HistoryCheckInController";
import {MetricsCheckInController} from "@/http/controllers/checkIns/MetricsCheckInController";

export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT);

    app.get('/check-ins/history', HistoryCheckInController);
    app.get('/check-ins/metrics', MetricsCheckInController);

    app.post('/gyms/:gymId/check-ins', CreateCheckInController)
    app.patch('/check-ins/:checkInId/validate', ValidateCheckInController)

}