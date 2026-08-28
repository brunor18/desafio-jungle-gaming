import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

import { WalletEntity } from './src/infrastructure/database/entities/wallet.entity';

export default defineConfig({  

  entities: [WalletEntity],

  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  user: process.env.POSTGRES_USER ?? 'jungle',
  password: process.env.POSTGRES_PASSWORD ?? 'jungle',
  dbName: process.env.POSTGRES_DB ?? 'wagering',

  extensions: [Migrator],

  migrations: {
    path: './src/infrastructure/database/migrations',
    pathTs: './src/infrastructure/database/migrations',
  },
});