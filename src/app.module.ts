import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //carregar o .env
    }),

    MikroOrmModule.forRoot({
      driver: PostgreSqlDriver,

      host: process.env.POSTGRES_HOST ?? 'localhost',
      port: Number(process.env.POSTGRES_PORT ?? 5432),

      user: process.env.POSTGRES_USER ?? 'jungle',
      password: process.env.POSTGRES_PASSWORD ?? 'jungle',
      dbName: process.env.POSTGRES_DB ?? 'wagering',

      autoLoadEntities: true,
      
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}