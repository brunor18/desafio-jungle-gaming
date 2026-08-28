import { describe, expect, it } from 'bun:test';

import { Wallet } from '../wallet';
import { WalletRepository } from '../wallet.repository';
import { CreateWalletUseCase } from '../create-wallet.use-case';

describe('CreateWalletUseCase', () => {
    it('deve criar uma wallet e salvar no repository', async () => {
        const savedWallets: Wallet[] = [];

        const walletRepository: WalletRepository = {
            async save(wallet: Wallet): Promise<void> {
                savedWallets.push(wallet);
            },

            async findById(): Promise<Wallet | null> {
                return null;
            },
        };

        const useCase = new CreateWalletUseCase(walletRepository);

        await useCase.execute({
            id: 'wallet-1',
            userId: 'user-1',
            currency: 'BRL',
        });

        expect(savedWallets).toHaveLength(1);

        const savedWallet = savedWallets[0];

        expect(savedWallet).toBeDefined();

        if (!savedWallet) {
            throw new Error('A wallet nao foi salva');
        }

        expect(savedWallet.id).toBe('wallet-1');
        expect(savedWallet.userId).toBe('user-1');
        expect(savedWallet.currency).toBe('BRL');

        expect(savedWallet.getBalance().toJSON()).toEqual({
            amount: '0.00',
            currency: 'BRL',
        });

        expect(savedWallet.getVersion()).toBe(1);
    });
});