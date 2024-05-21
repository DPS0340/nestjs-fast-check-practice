import { TransferType } from '../../../domain/entities/transfer.entity';

export class TransferResponseDto {
  id: number;
  amount: number;
  type: TransferType;
}
