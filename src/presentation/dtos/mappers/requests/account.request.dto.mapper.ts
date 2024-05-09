import { Injectable } from '@nestjs/common';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { AccountResponseDto } from '../../response/account.response.dto';
import { TransferRequestDtoMapper } from './transfer.request.dto.mapper';

@Injectable()
export class AccountRequestDtoMapper {
  constructor(
    private readonly transferRequestDtoMapper: TransferRequestDtoMapper,
  ) {}

  convertToDto(entity: AccountEntity): AccountResponseDto {
    const { id, name, balance, transfers } = entity;
    return {
      id,
      name,
      balance,
      transfers: transfers.map(this.transferRequestDtoMapper.convertToDto),
    } as AccountResponseDto;
  }
}
