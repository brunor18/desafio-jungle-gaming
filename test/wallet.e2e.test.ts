import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

import { WalletModule } from '../src/domain/Wallet/wallet.module';
import { WALLET_REPOSITORY } from '../src/domain/Wallet/wallet.repository';

describe('Wallet E2E', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [WalletModule],
        })
            .overrideProvider(WALLET_REPOSITORY)
            .useValue({
                save: async () => {},
                findById: async () => null,
            })
            .compile();

        app = moduleRef.createNestApplication();

        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('deve criar uma wallet pela api HTTP', async () => {
        const response = await request(app.getHttpServer())
            .post('/wallets')
            .send({
                id: '550e8400-e29b-41d4-a716-446655440000',
                userId: 'user-1',
                currency: 'BRL',
            });

        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            message: 'Wallet criada com sucesso',
        });
    });
});