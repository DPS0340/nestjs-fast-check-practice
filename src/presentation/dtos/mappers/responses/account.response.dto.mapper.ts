import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../../../../domain/entities/account.entity';
import { AccountResponseDto } from '../../response/account.response.dto';
import { TransferResponseDtoMapper } from './transfer.response.dto.mapper';

@Injectable()
export class AccountResponseDtoMapper {
  constructor(
    private readonly transferResponseDtoMapper: TransferResponseDtoMapper,
  ) {}

  convertToDto(entity: AccountEntity): AccountResponseDto {
    const balance = entity.getBalance();
    const { id, name, transfers } = entity;
    return {
      id,
      name,
      balance,
      transfers: transfers.map(this.transferResponseDtoMapper.convertToDto),
    } as AccountResponseDto;
  }
}
