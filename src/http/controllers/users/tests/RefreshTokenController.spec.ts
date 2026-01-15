import request from 'supertest';
import {afterAll, beforeAll, describe, expect, it} from "vitest";
import {app} from "@/app";

describe('RefreshTokenController (e2e)', () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should be able to refresh token', async () => {
        await request(app.server)
            .post('/users')
            .send({
                name: 'John Doe',
                email: 'john@example.com',
                password: '123456'
            });

        const authResponse = await request(app.server)
            .post('/sessions')
            .send({
                email: 'john@example.com',
                password: '123456'
            });

        const cookies = authResponse.get('Set-cookie');

        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies ?? '')
            .send();

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken='),
        ])
    });
});