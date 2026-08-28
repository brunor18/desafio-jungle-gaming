import { IsNotEmpty, IsString, IsUUID, Length, Matches } from 'class-validator';

export class CreateWalletDto {
    @IsUUID()
    id!: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    userId!: string;

    @IsString()
    @IsNotEmpty()
    @Length(3, 3)
    @Matches(/^[A-Z]{3}$/, {
        message: 'A moeda deve ser um código ISO 4217 de 3 letras maiúsculas',
    })
    currency!: string;
}