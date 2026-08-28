import { describe, expect, it } from 'bun:test';

import { WalletController } from '../controller/wallet.controller';
import { CreateWalletUseCase } from '../create-wallet.use-case';

describe('WalletController', () => {
    it('deve criar uma wallet', async () => {
        const execute = async () => {};

        const createWalletUseCase = {
            execute,
        } as unknown as CreateWalletUseCase;

        const controller = new WalletController(createWalletUseCase);

        const result = await controller.create({
            id: '550e8400-e29b-41d4-a716-446655440000',
            userId: 'user-1',
            currency: 'BRL',
        });

        expect(result).toEqual({
            message: 'Wallet criada com sucesso',
        });
    });
});