import Decimal from 'decimal.js';

export interface MoneyProps {
    amount: string;
    currency: string;
}

export class Money {
    private constructor(
        private readonly value: Decimal,
        public readonly currency: string,
    ) { }

    static from(props: MoneyProps): Money {
        if (!props.amount || props.amount.trim() === '') {
            throw new Error('A quantidade nao pode ser vazia');
        }

        if (!props.currency || props.currency.trim() === '') {
            throw new Error('A moeda nao pode ser vazia');
        }

        const amountPattern = /^\d+(\.\d{1,2})?$/;

        if (!amountPattern.test(props.amount)) {
            throw new Error('Quantidade de dinheiro invalida');
        }

        const value = new Decimal(props.amount);

        return new Money(value, props.currency);
    }

    static zero(currency: string): Money {
        return Money.from({
            amount: '0.00',
            currency,
        });
    }

    add(other: Money): Money {
        this.checkSameCurrency(other);

        const result = this.value.add(other.value);

        return new Money(result, this.currency);
    }

    subtract(other: Money): Money {
        this.checkSameCurrency(other);

        const result = this.value.sub(other.value);

        return new Money(result, this.currency);
    }

    negate(): Money {
        return new Money(this.value.negated(), this.currency);
    }


    isZero(): boolean {
        return this.value.isZero();
    }

    isPositive(): boolean {
        return this.value.isPositive();
    }

    isNegative(): boolean {
        return this.value.isNegative();
    }

    isLessThan(other: Money): boolean {
        this.checkSameCurrency(other);

        return this.value.lessThan(other.value);
    }

    equals(other: Money): boolean {
        return (
            this.currency === other.currency &&
            this.value.equals(other.value)
        );
    }

    toJSON(): MoneyProps {
        return {
            amount: this.value.toFixed(2),
            currency: this.currency,
        };
    }

    toString(): string {
        return `${this.value.toFixed(2)} ${this.currency}`;
    }





    // metodo para verificar se as moedas sao iguais
    private checkSameCurrency(other: Money): void {
        if (this.currency !== other.currency) {
            throw new Error('As moedas nao coincidem');
        }
    }
}

