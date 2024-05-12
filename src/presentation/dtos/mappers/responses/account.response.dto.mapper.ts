import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { AccountResponseDto } from '../../response/account.response.dto';
import { TransferResponseDtoMapper } from './transfer.response.dto.mapper';

@Injectable()
export class AccountResponseDtoMapper {
  constructor(
    private readonly transferResponseDtoMapper: TransferResponseDtoMapper,
  ) {}

  convertToDto(entity: AccountEntity): AccountResponseDto {
    const { id, name, balance, transfers } = entity;
    return {
      id,
      name,
      balance,
      transfers: transfers.map(this.transferResponseDtoMapper.convertToDto),
    } as AccountResponseDto;
  }
}
