import request from 'supertest';
import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {app} from "@/app";
import {createAndAuthenticateUser} from "@/utils/test/CreateAndAuthenticateUser";
import {prisma} from "@/lib/prisma";

describe('HistoryCheckInController (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to list check-in history', async () => {
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
            .get(`/check-ins/history`)
            .set('Authorization', `Bearer ${token}`)
            .query({
                page: 1
            });

        expect(response.status).toBe(200);
        expect(response.body.checkIns).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    gym_id: gym.id
                })
            ])
        );
    });
});