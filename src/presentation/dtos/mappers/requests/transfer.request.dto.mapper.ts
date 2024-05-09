import { Injectable } from '@nestjs/common';
import { TransferEntity } from 'src/domain/entities/transfer.entity';
import { TransferResponseDto } from '../../response/transfer.response.dto';

@Injectable()
export class TransferRequestDtoMapper {
  convertToDto(entity: TransferEntity): TransferResponseDto {
    const { id, amount, type } = entity;
    return {
      id,
      amount,
      type,
    } as TransferResponseDto;
  }
}
