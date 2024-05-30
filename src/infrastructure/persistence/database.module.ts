import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { mikroOrmModuleConfig } from './mikro-orm.module.config';
import { AccountEntity } from '../../domain/entities/account.entity';
import { TransferEntity } from '../../domain/entities/transfer.entity';

@Module({
  imports: [MikroOrmModule.forRoot(mikroOrmModuleConfig)],
  exports: [MikroOrmModule.forRoot(mikroOrmModuleConfig)],
})
export class DatabaseModule {}
