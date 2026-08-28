import { Body, Controller, Post } from '@nestjs/common';

import { CreateWalletDto } from '../dto/create-wallet.dto';

import { CreateWalletUseCase } from '../create-wallet.use-case';


@Controller('wallets')
export class WalletController {
    constructor(
        private readonly createWalletUseCase: CreateWalletUseCase,
    ) {}

    @Post()
    async create(@Body() body: CreateWalletDto) {
        await this.createWalletUseCase.execute(body);

        return {
            message: 'Wallet criada com sucesso',
        };
    }
}