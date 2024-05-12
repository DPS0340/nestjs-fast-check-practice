import { Injectable } from '@nestjs/common';
import { TransferRequestDtoMapper } from './transfer.request.dto.mapper';
import { AccountCreateRequestDto } from '../../requests/create/account.create.request.dto';
import { AccountEntity } from 'src/domain/entities/account.entity';

@Injectable()
export class AccountRequestDtoMapper {
  constructor(
    private readonly transferRequestDtoMapper: TransferRequestDtoMapper,
  ) {}

  convertToEntity(dto: AccountCreateRequestDto): AccountEntity {
    const { name } = dto;
    return {
      name,
    } as AccountEntity;
  }
}
