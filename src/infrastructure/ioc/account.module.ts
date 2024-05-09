import { Module } from '@nestjs/common';
import { AccountController } from 'src/presentation/controllers/account.controller';
import { AccountsUseCases } from 'src/application/use-cases/account.use-case';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { AccountRequestDtoMapper } from 'src/presentation/dtos/mappers/requests/account.request.dto.mapper';
import { TransferEntity } from 'src/domain/entities/transfer.entity';
import { TransferRequestDtoMapper } from 'src/presentation/dtos/mappers/requests/transfer.request.dto.mapper';

@Module({
  imports: [
    AccountsUseCases,
    AccountEntity,
    TransferEntity,
    AccountRequestDtoMapper,
    TransferRequestDtoMapper,
  ],
  controllers: [AccountController],
  providers: [],
})
export class AccountModule {}
