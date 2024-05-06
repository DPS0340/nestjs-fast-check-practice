import { Module } from '@nestjs/common';
import { AccountModule } from './infrastructure/ioc/account.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { SqliteDriver } from '@mikro-orm/sqlite';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/domain/entities'],
      dbName: 'db.sqlite3',
      driver: SqliteDriver,
    }),
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
