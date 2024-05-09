import { TransferType } from 'src/domain/entities/transfer.entity';

export class TransferResponseDto {
  id: number;
  amount: number;
  type: TransferType;
}
