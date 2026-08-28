export class WalletAlreadyExistsError extends Error {
    constructor() {
        super('A wallet já existe');
        this.name = 'WalletAlreadyExistsError';
    }
}