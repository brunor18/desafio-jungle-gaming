import { Wallet } from './wallet';


export const WALLET_REPOSITORY = 'WALLET_REPOSITORY';

export interface WalletRepository {
    save(wallet: Wallet): Promise<void>;
    findById(id: string): Promise<Wallet | null>;
}