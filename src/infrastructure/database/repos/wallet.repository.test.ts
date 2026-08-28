import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { MikroORM } from '@mikro-orm/postgresql';

import { Wallet } from '../../../domain/Wallet/wallet';
import { WalletEntity } from '../entities/wallet.entity';
import { MikroOrmWalletRepository } from './mikro-orm-wallet.repository';

describe('MikroOrmWalletRepository', () => {
    let orm: MikroORM;
    let repository: MikroOrmWalletRepository;

    beforeAll(async () => {
        orm = await MikroORM.init({
            entities: [WalletEntity],

            host: process.env.POSTGRES_HOST ?? 'localhost',
            port: Number(process.env.POSTGRES_PORT ?? 5432),

            user: process.env.POSTGRES_USER ?? 'jungle',
            password: process.env.POSTGRES_PASSWORD ?? 'jungle',
            dbName: process.env.POSTGRES_DB ?? 'wagering',
        });

        repository = new MikroOrmWalletRepository(orm.em.fork());
    });

    afterAll(async () => {
        await orm.close();
    });

    it('deve salvar uma wallet', async () => {
        const wallet = Wallet.create({
            id: '550e8400-e29b-41d4-a716-446655440000',
            userId: 'user-test-1',
            currency: 'BRL',
        });

        await repository.save(wallet);

        const em = orm.em.fork();

        const result = await em.findOne(
            WalletEntity,
            { id: wallet.id },
        );

        expect(result).not.toBeNull();
        expect(result?.userId).toBe('user-test-1');
        expect(result?.currency).toBe('BRL');
        expect(result?.balance).toBe('0.00');
        expect(result?.version).toBe(1);
    })})
