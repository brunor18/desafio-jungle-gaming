import { describe, expect, it } from 'bun:test';

import { Money } from '../../../domain/Money/money';
import { Wallet } from '../../../domain/Wallet/wallet';
import { WalletMapper } from './wallet.mapper';

describe('WalletMapper', () => {
    it('deve converter uma Wallet para WalletEntity', () => {
        const wallet = Wallet.create({
            id: 'wallet-1',
            userId: 'user-1',
            currency: 'BRL',
        });

        wallet.deposit(
            Money.from({
                amount: '100.00',
                currency: 'BRL',
            }),
        );

        const entity = WalletMapper.toEntity(wallet);

        expect(entity.id).toBe('wallet-1');
        expect(entity.userId).toBe('user-1');
        expect(entity.currency).toBe('BRL');
        expect(entity.balance).toBe('100.00');
        expect(entity.version).toBe(2);
    });
});