import { EntityManager, UniqueConstraintViolationException } from '@mikro-orm/core';
import { InjectEntityManager } from '@mikro-orm/nestjs';

import { Wallet } from '../../../domain/Wallet/wallet';
import { WalletRepository } from '../../../domain/Wallet/wallet.repository';
import { WalletMapper } from '../mappers/wallet.mapper';
import { WalletEntity } from '../entities/wallet.entity';
import { WalletAlreadyExistsError } from '../../../domain/Wallet/errors/wallet-already-exists.error';

export class MikroOrmWalletRepository implements WalletRepository {
    constructor(
        @InjectEntityManager('default')
        private readonly em: EntityManager,
    ) {}

    async save(wallet: Wallet): Promise<void> {
        const entity = WalletMapper.toEntity(wallet);

        this.em.persist(entity);

        try {
            await this.em.flush();
        } catch (error) {
            if (error instanceof UniqueConstraintViolationException) {
                throw new WalletAlreadyExistsError();
            }

            throw error;
        }
    }

    async findById(id: string): Promise<Wallet | null> {
        const entity = await this.em.findOne(
            WalletEntity,
            { id },
        );

        if (!entity) {
            return null;
        }

        return WalletMapper.toDomain(entity);
    }
}