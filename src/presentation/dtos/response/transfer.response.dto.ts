import { TransferType } from 'src/domain/entities/transfer.entity';

export class TransferResponseDto {
  amount: number;
  type: TransferType;
}
