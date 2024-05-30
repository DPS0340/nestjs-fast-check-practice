import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { mikroOrmModuleConfig } from './mikro-orm.module.config';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmModuleConfig)],
  exports: [MikroOrmModule.forRoot(mikroOrmModuleConfig)],
})
export class DatabaseModule {}
