import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { SqliteDriver } from '@mikro-orm/sqlite';

export const mikroOrmModuleConfig: MikroOrmModuleSyncOptions = {
  autoLoadEntities: true,
  allowGlobalContext: true,
  entities: ['../../../dist/entities'],
  entitiesTs: ['../../../src/domain/entities'],
  dbName: 'db.sqlite3',
  driver: SqliteDriver,
  extensions: [EntityGenerator, Migrator],
};
