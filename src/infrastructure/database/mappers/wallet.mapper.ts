import { Wallet } from '../../../domain/Wallet/wallet';
import { Money } from '../../../domain/Money/money';
import { WalletEntity } from '../entities/wallet.entity';

export class WalletMapper {
    static toEntity(wallet: Wallet): WalletEntity {
        const entity = new WalletEntity();

        entity.id = wallet.id;
        entity.userId = wallet.userId;
        entity.currency = wallet.currency;
        entity.balance = wallet.getBalance().toJSON().amount;
        entity.version = wallet.getVersion();

        return entity;
    }

    static toDomain(entity: WalletEntity): Wallet {
        return Wallet.fromPersistence({
            id: entity.id,
            userId: entity.userId,
            currency: entity.currency,
            balance: Money.from({
                amount: entity.balance,
                currency: entity.currency,
            }),
            version: entity.version,
        });
    }
}