import { Module } from '@nestjs/common';
import { AccountController } from 'src/presentation/controllers/account.controller';
import { AccountsUseCases } from 'src/application/use-cases/account.use-case.';
import { AccountRepository } from '../persistence/account.repository';
import { AccountEntity } from 'src/domain/entities/account.entity';

@Module({
  imports: [AccountsUseCases, AccountEntity, AccountRepository],
  controllers: [AccountController],
  providers: [],
})
export class AccountModule {}
