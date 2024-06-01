import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

export const mikroOrmModuleConfig: MikroOrmModuleSyncOptions = {
  autoLoadEntities: true,
  allowGlobalContext: true,
  entities: ['../../../dist/entities'],
  entitiesTs: ['../../../src/domain/entities'],
  dbName: 'nestjs-fast-check-practice',
  driver: PostgreSqlDriver,
  host: 'nestjs-fast-check-practice-database',
  port: 5432,
  user: 'nestjs-fast-check-practice',
  password: 'nestjs-fast-check-practice',
  extensions: [EntityGenerator, Migrator],
  connect: false,
};
