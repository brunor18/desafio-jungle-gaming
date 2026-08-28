import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { INestApplication, ValidationPipe } from '@nestjs/common';
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

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    await app.init();
});

afterAll(async () => {
    await app.close();
});

it('deve criar uma wallet via HTTP', async () => {
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

it('deve retornar 400 quando o id for inválido', async () => {
    const response = await request(app.getHttpServer())
        .post('/wallets')
        .send({
            id: 'id-invalido',
            userId: 'user-1',
            currency: 'BRL',
        });

    expect(response.status).toBe(400);
});

it('deve retornar 400 quando o userId estiver vazio', async () => {
    const response = await request(app.getHttpServer())
        .post('/wallets')
        .send({
            id: '550e8400-e29b-41d4-a716-446655440000',
            userId: '',
            currency: 'BRL',
        });

    expect(response.status).toBe(400);
});

it('deve retornar 400 quando a currency estiver vazia', async () => {
    const response = await request(app.getHttpServer())
        .post('/wallets')
        .send({
            id: '550e8400-e29b-41d4-a716-446655440000',
            userId: 'user-1',
            currency: '',
        });

    expect(response.status).toBe(400);
});


});
