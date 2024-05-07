import { TransferResponseDto } from './transfer.response.dto';

export class AccountResponseDto {
  id: number;
  name: string;
  amount: number;
  transfers: TransferResponseDto[];
}
