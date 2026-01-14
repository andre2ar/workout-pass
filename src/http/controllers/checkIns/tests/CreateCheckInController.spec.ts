import request from 'supertest';
import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {app} from "@/app";
import {createAndAuthenticateUser} from "@/utils/test/CreateAndAuthenticateUser";
import {prisma} from "@/lib/prisma";

describe('CreateCheckInController (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to create check-in', async () => {
        const {token} = await createAndAuthenticateUser(app);

        const gym = await prisma.gym.create({
            data: {
                name: 'Gym 01',
                description: 'Some description',
                phone: '11999999999',
                latitude: 0,
                longitude: 0
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: 0,
                longitude: 0,
            });

        expect(response.status).toBe(201);
    });
});