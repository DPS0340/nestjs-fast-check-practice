import { TransferType } from 'src/domain/entities/transfer.entity';

export class TransferCreateRequestDto {
  type: TransferType;
  accountId: number;
  amount: number;
}
