import { Module } from '@nestjs/common';

import { CreateWalletUseCase } from './create-wallet.use-case';
import { WALLET_REPOSITORY } from './wallet.repository';
import { MikroOrmWalletRepository } from '../../infrastructure/database/repos/mikro-orm-wallet.repository';
import { WalletController } from './controller/wallet.controller'

@Module({
    controllers: [WalletController],
    providers: [
        CreateWalletUseCase,
        {
            provide: WALLET_REPOSITORY,
            useClass: MikroOrmWalletRepository,
        },
    ],
    exports: [
        CreateWalletUseCase,
    ],
})
export class WalletModule {}