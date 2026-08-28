import { Entity, PrimaryKey, Property, } from '@mikro-orm/decorators/legacy';


@Entity({ tableName: 'wallets' })
export class WalletEntity {
    @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
    id!: string;

    @Property({ type: 'string' })
    userId!: string;

    @Property({ type: 'string' })
    currency!: string;

    @Property({
        type: 'decimal',
        precision: 20,
        scale: 2,
    })
    balance!: string;

    @Property({ type: 'number' })
    version!: number;

    @Property()
    createdAt: Date = new Date(); // separei os timestamps da classe principal pois esse dado so e usado para controle de persistencia

    @Property({ onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}