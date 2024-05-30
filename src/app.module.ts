import { Module } from '@nestjs/common';
import { AccountModule } from './infrastructure/ioc/account.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      allowGlobalContext: true,
      entities: ['./dist/entities'],
      entitiesTs: ['./src/domain/entities'],
      dbName: 'db.sqlite3',
      driver: SqliteDriver,
      extensions: [EntityGenerator, Migrator],
    }),
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
