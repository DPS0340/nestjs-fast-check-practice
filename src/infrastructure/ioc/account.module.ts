import { Module } from '@nestjs/common';
import { AccountController } from '../../presentation/controllers/account.controller';
import { AccountsUseCases } from '../..//application/use-cases/account.use-case';
import { AccountEntity } from '../../domain/entities/account.entity';
import { AccountRequestDtoMapper } from '../../presentation/dtos/mappers/requests/account.request.dto.mapper';
import { TransferEntity } from '../../domain/entities/transfer.entity';
import { TransferRequestDtoMapper } from '../../presentation/dtos/mappers/requests/transfer.request.dto.mapper';

@Module({
  imports: [],
  controllers: [
    AccountController,
    AccountsUseCases,
    AccountEntity,
    TransferEntity,
    AccountRequestDtoMapper,
    TransferRequestDtoMapper,
  ],
  providers: [],
})
export class AccountModule {}
