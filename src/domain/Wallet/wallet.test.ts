import { describe, expect, it } from 'bun:test';

import { Money } from '../Money/money';
import { Wallet } from './wallet';

describe('Wallet', () => {
    it('deve criar uma wallet com saldo zero', () => {
        const wallet = Wallet.create({
            id: 'wallet-1',
            userId: 'user-1',
            currency: 'BRL',
        });

        expect(wallet.getBalance().toJSON()).toEqual({
            amount: '0.00',
            currency: 'BRL',
        });

        expect(wallet.getVersion()).toBe(1);
    });

    it('deve realizar um deposito', () => {
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

        expect(wallet.getBalance().toJSON()).toEqual({
            amount: '100.00',
            currency: 'BRL',
        });
    });

    it('deve realizar um saque', () => {
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

        wallet.withdraw(
            Money.from({
                amount: '30.00',
                currency: 'BRL',
            }),
        );

        expect(wallet.getBalance().toJSON()).toEqual({
            amount: '70.00',
            currency: 'BRL',
        });
    });

    it('nao deve permitir saque maior que o saldo', () => {
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

        expect(() =>
            wallet.withdraw(
                Money.from({
                    amount: '100.01',
                    currency: 'BRL',
                }),
            ),
        ).toThrow('Saldo insuficiente');
    });

    it('nao deve permitir deposito em moeda diferente', () => {
        const wallet = Wallet.create({
            id: 'wallet-1',
            userId: 'user-1',
            currency: 'BRL',
        });

        expect(() =>
            wallet.deposit(
                Money.from({
                    amount: '100.00',
                    currency: 'USD',
                }),
            ),
        ).toThrow('As moedas nao coincidem');
    });

    it('nao deve permitir saque em moeda diferente', () => {
        const wallet = Wallet.create({
            id: 'wallet-1',
            userId: 'user-1',
            currency: 'BRL',
        });

        expect(() =>
            wallet.withdraw(
                Money.from({
                    amount: '10.00',
                    currency: 'USD',
                }),
            ),
        ).toThrow('As moedas nao coincidem');
    });

    it('nao deve permitir deposito zero', () => {
        const wallet = Wallet.create({
            id: 'wallet-1',
            userId: 'user-1',
            currency: 'BRL',
        });

        expect(() =>
            wallet.deposit(Money.zero('BRL')),
        ).toThrow('O deposito deve ser positivo');
    });

    it('nao deve permitir saque zero', () => {
        const wallet = Wallet.create({
            id: 'wallet-1',
            userId: 'user-1',
            currency: 'BRL',
        });

        expect(() =>
            wallet.withdraw(Money.zero('BRL')),
        ).toThrow('O saque deve ser positivo');
    });
});