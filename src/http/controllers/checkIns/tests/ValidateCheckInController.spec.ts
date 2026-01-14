import request from 'supertest';
import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {app} from "@/app";
import {createAndAuthenticateUser} from "@/utils/test/CreateAndAuthenticateUser";
import {prisma} from "@/lib/prisma";

describe('ValidateCheckInController (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to validate check-in', async () => {
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

        const checkInResponse = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: 0,
                longitude: 0,
            });

        const checkIn = checkInResponse.body.checkIn;

        const validatedCheckIn = await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send();

        expect(validatedCheckIn.status).toBe(200);
        expect(validatedCheckIn.body.checkIn.validated_at).toBeDefined();

        const savedCheckIn = await prisma.checkIn.findUniqueOrThrow({
            where: {id: checkIn.id}
        });
        expect(savedCheckIn.validated_at).toEqual(expect.any(Date));
    });
});