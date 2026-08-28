import { Inject } from '@nestjs/common';    

import { Wallet } from './wallet';
import type { WalletRepository } from './wallet.repository';
import { WALLET_REPOSITORY } from './wallet.repository';

interface CreateWalletInput {
    id: string;
    userId: string;
    currency: string;
}

export class CreateWalletUseCase {
    constructor(
        @Inject(WALLET_REPOSITORY)
        private readonly walletRepository: WalletRepository,
    ) { }

    async execute(input: {
        id: string;
        userId: string;
        currency: string;
    }): Promise<void> {
        const wallet = Wallet.create({
            id: input.id,
            userId: input.userId,
            currency: input.currency,
        });

        await this.walletRepository.save(wallet);
    }
}