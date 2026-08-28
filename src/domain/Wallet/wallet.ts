import { Money } from '../Money/money';

export interface WalletProps {
    id: string;
    userId: string;
    currency: string;
    balance: Money;
    version: number;
}

export class Wallet {
    private constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly currency: string,
        private balance: Money,
        private version: number,
    ) { }

    static create(props: { id: string, userId: string, currency: string }): Wallet {
        return new Wallet(
            props.id,
            props.userId,
            props.currency,
            Money.zero(props.currency),
            1,
        );
    }

    static fromPersistence(props: WalletProps): Wallet {
    return new Wallet(
        props.id,
        props.userId,
        props.currency,
        props.balance,
        props.version,
    );
}

    getBalance(): Money {
        return this.balance;
    }

    getVersion(): number {
        return this.version;
    }

    deposit(amount: Money): void {
        this.checkSameCurrency(amount);

        if (amount.isNegative() || amount.isZero()) {
            throw new Error('O deposito deve ser positivo');
        }

        this.balance = this.balance.add(amount);
        this.version += 1;
    }

    withdraw(amount: Money): void {
        this.checkSameCurrency(amount);

        if (amount.isNegative() || amount.isZero()) {
            throw new Error('O saque deve ser positivo');
        }

        const newBalance = this.balance.subtract(amount);

        if (newBalance.isNegative()) {
            throw new Error('Saldo insuficiente');
        }

        this.balance = newBalance;
        this.version += 1;
    }

    // metodo para verificar se as moedas sao iguais
    private checkSameCurrency(other: Money): void {
        if (this.currency !== other.currency) {
            throw new Error('As moedas nao coincidem');
        }
    }
}