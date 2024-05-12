import { Injectable } from '@nestjs/common';
import { TransferCreateRequestDto } from '../../requests/create/transfer.create.request.dto';
import { TransferEntity } from 'src/domain/entities/transfer.entity';
import { AccountsUseCases } from 'src/application/use-cases/account.use-case';

@Injectable()
export class TransferRequestDtoMapper {
  constructor(private readonly accountUseCases: AccountsUseCases) {}

  async convertToEntity(
    dto: TransferCreateRequestDto,
  ): Promise<TransferEntity> {
    const { accountId, amount, type } = dto;
    const account = await this.accountUseCases.findById(accountId);
    return {
      account,
      amount,
      type,
    } as TransferEntity;
  }
}
