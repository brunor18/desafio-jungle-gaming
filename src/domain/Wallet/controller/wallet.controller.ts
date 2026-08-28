import { Body, Controller, Post } from '@nestjs/common';

import { CreateWalletUseCase } from '../create-wallet.use-case';

interface CreateWalletRequest {
    id: string;
    userId: string;
    currency: string;
}

@Controller('wallets')
export class WalletController {
    constructor(
        private readonly createWalletUseCase: CreateWalletUseCase,
    ) {}

    @Post()
    async create(@Body() body: CreateWalletRequest) {
        await this.createWalletUseCase.execute(body);

        return {
            message: 'Wallet criada com sucesso',
        };
    }
}