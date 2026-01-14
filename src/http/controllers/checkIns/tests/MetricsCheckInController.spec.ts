import request from 'supertest';
import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {app} from "@/app";
import {createAndAuthenticateUser} from "@/utils/test/CreateAndAuthenticateUser";
import {prisma} from "@/lib/prisma";

describe('MetricsCheckInController (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to list check-in metrics', async () => {
        const {token} = await createAndAuthenticateUser(app);

        const gym = await prisma.gym.create({
            data: {
                name: 'Gym 01',
                description: 'Some description',
                phone: '11999999999',
                latitude: 0,
                longitude: 0
            }
        });

        await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: 0,
                longitude: 0,
            });

        const response = await request(app.server)
            .get(`/check-ins/metrics`)
            .set('Authorization', `Bearer ${token}`)
            .query({
                page: 1
            });

        expect(response.status).toBe(200);
        expect(response.body.checkInsCount).toBe(1);
    });
});