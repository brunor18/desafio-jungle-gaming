import { Wallet } from './wallet';

export interface WalletRepository {
    save(wallet: Wallet): Promise<void>;
    findById(id: string): Promise<Wallet | null>;
}