import { Module } from '@nestjs/common';
import { AccountModule } from './infrastructure/ioc/account.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      autoLoadEntities: true,
      allowGlobalContext: true,
      entities: ['./dist/entities'],
      entitiesTs: ['./src/domain/entities'],
      dbName: 'nestjs-fast-check-practice',
      driver: PostgreSqlDriver,
      extensions: [EntityGenerator, Migrator],
    }),
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
