import { afterAll, beforeAll, describe, expect, it } from 'bun:test';
import { randomUUID } from 'node:crypto';
import { MikroORM } from '@mikro-orm/postgresql';

import { Money } from '../../../domain/Money/money';
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

        repository = new MikroOrmWalletRepository(
            orm.em.fork(),
        );
    });

    afterAll(async () => {
        await orm.close();
    });

    it('deve salvar uma wallet', async () => {
        const wallet = Wallet.create({
            id: randomUUID(),
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
    });

    it('deve buscar uma wallet pelo id', async () => {
        const wallet = Wallet.create({
            id: randomUUID(),
            userId: 'user-test-2',
            currency: 'BRL',
        });

        wallet.deposit(
            Money.from({
                amount: '100.00',
                currency: 'BRL',
            }),
        );

        await repository.save(wallet);

        const result = await repository.findById(wallet.id);

        expect(result).not.toBeNull();
        expect(result?.id).toBe(wallet.id);
        expect(result?.userId).toBe('user-test-2');
        expect(result?.currency).toBe('BRL');

        expect(result?.getBalance().toJSON()).toEqual({
            amount: '100.00',
            currency: 'BRL',
        });

        expect(result?.getVersion()).toBe(2);
    });

    it('deve retornar null quando a wallet nao existir', async () => {
        const result = await repository.findById(randomUUID());

        expect(result).toBeNull();
    });
});