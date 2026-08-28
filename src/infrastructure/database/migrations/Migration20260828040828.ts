import { Migration } from '@mikro-orm/migrations';

export class Migration20260828040828 extends Migration {

  override name = 'Migration20260828040828';

  override up(): void | Promise<void> {

    this.addSql('create extension if not exists "pgcrypto";');


    this.addSql(`create table "wallets" ("id" uuid not null default gen_random_uuid(), "user_id" varchar(255) not null, "currency" varchar(255) not null, "balance" numeric(20,2) not null, "version" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "wallets" cascade;`);
  }

}
