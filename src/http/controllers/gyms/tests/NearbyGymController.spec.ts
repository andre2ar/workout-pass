import request from 'supertest';
import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {app} from "@/app";
import {createAndAuthenticateUser} from "@/utils/test/CreateAndAuthenticateUser";

describe('NearbyGymController (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to list nearby gyms', async () => {
        const {token} = await createAndAuthenticateUser(app, true);

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Gym 01',
                description: 'Some description',
                phone: '11999999999',
                latitude: 0,
                longitude: 0
            });

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Gym 02',
                description: 'Some description',
                phone: '11999999999',
                latitude: -27.2092052,
                longitude: -49.6401091
            });

        const response = await request(app.server)
            .get('/gyms/nearby')
            .set('Authorization', `Bearer ${token}`)
            .query({
                latitude: 0,
                longitude: 0,
            });

        expect(response.status).toBe(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Gym 01',
                })
            ])
        );
    });
});