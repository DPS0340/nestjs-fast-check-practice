import { IsEnum, IsInt, Min } from 'class-validator';
import { TransferType } from '../../../../domain/entities/transfer.entity';

export class TransferCreateRequestDto {
  @IsEnum(TransferType)
  type: TransferType;
  @IsInt()
  @Min(1)
  accountId: number;
  @IsInt()
  @Min(1)
  amount: number;
}
