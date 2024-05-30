import { Module } from '@nestjs/common';
import { AccountController } from '../../presentation/controllers/account.controller';
import { AccountsUseCases } from '../..//application/use-cases/account.use-case';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountRequestDtoMapper } from '../../presentation/dtos/mappers/requests/account.request.dto.mapper';
import { TransferEntity } from '../../domain/entities/transfer.entity';
import { TransferRequestDtoMapper } from '../../presentation/dtos/mappers/requests/transfer.request.dto.mapper';
import { TransferResponseDtoMapper } from '../../presentation/dtos/mappers/responses/transfer.response.dto.mapper';
import { AccountResponseDtoMapper } from '../../presentation/dtos/mappers/responses/account.response.dto.mapper';
import { DatabaseModule } from '../persistence/database.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    DatabaseModule,
    MikroOrmModule.forFeature({ entities: [AccountEntity, TransferEntity] }),
  ],
  controllers: [AccountController],
  providers: [
    AccountEntity,
    TransferEntity,
    AccountsUseCases,
    TransferRequestDtoMapper,
    TransferResponseDtoMapper,
    AccountRequestDtoMapper,
    AccountResponseDtoMapper,
  ],
})
export class AccountModule {}
