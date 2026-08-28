import { Wallet } from '../../../domain/Wallet/wallet';
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
}