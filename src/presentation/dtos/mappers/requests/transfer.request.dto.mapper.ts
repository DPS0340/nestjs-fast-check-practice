import { Injectable } from '@nestjs/common';
import { TransferCreateRequestDto } from '../../requests/create/transfer.create.request.dto';
import { TransferEntity } from '../../../../domain/entities/transfer.entity';
import { AccountsUseCases } from '../../../../application/use-cases/account.use-case';

@Injectable()
export class TransferRequestDtoMapper {
  constructor(private readonly accountsUseCases: AccountsUseCases) {}

  async convertToEntity(
    dto: TransferCreateRequestDto,
  ): Promise<TransferEntity> {
    const { accountId, amount, type } = dto;
    const account = await this.accountsUseCases.findById(accountId);
    return {
      id: accountId,
      account,
      amount,
      type,
    } as unknown as TransferEntity;
  }
}
