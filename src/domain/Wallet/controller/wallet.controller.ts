import { Body, Controller, Post, ConflictException, } from '@nestjs/common';

import { CreateWalletDto } from '../dto/create-wallet.dto';

import { CreateWalletUseCase } from '../create-wallet.use-case';

import { WalletAlreadyExistsError } from '../errors/wallet-already-exists.error';


@Controller('wallets')
export class WalletController {
    constructor(
        private readonly createWalletUseCase: CreateWalletUseCase,
    ) {}

    @Post()
    async create(@Body() body: CreateWalletDto) {
        try {
            await this.createWalletUseCase.execute(body);

            return {
                message: 'Wallet criada com sucesso',
            };
        } catch (error) {
            if (error instanceof WalletAlreadyExistsError) {
                throw new ConflictException(error.message);
            }

            throw error;
        }
    }
}