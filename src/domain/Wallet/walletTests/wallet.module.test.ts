import { describe, expect, it } from 'bun:test';
import { Test } from '@nestjs/testing';

import { WalletModule } from '../wallet.module';
import { CreateWalletUseCase } from '../create-wallet.use-case';
import { WALLET_REPOSITORY } from '../wallet.repository';

describe('WalletModule', () => {
    it('deve injetar o WalletRepository no CreateWalletUseCase', async () => {
        const walletRepositoryMock = {
            save: async () => {},
            findById: async () => null,
        };

        const moduleRef = await Test.createTestingModule({
            imports: [WalletModule],
        })
            .overrideProvider(WALLET_REPOSITORY)
            .useValue(walletRepositoryMock)
            .compile();

        const useCase = moduleRef.get(CreateWalletUseCase);

        expect(useCase).toBeDefined();
    });
});