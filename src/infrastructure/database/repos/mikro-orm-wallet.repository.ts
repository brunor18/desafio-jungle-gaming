import { EntityManager } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';

import { Wallet } from '../../../domain/Wallet/wallet';
import { WalletRepository } from '../../../domain/Wallet/wallet.repository';
import { WalletMapper } from '../mappers/wallet.mapper';

export class MikroOrmWalletRepository implements WalletRepository {
    constructor(
        @InjectEntityManager('default')
        private readonly em: EntityManager,
    ) {}

    async save(wallet: Wallet): Promise<void> {
        const entity = WalletMapper.toEntity(wallet);

        this.em.persist(entity);

        await this.em.flush();
    }
}