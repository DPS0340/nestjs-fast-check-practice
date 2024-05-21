import { Injectable } from '@nestjs/common';
import { AccountCreateRequestDto } from '../../requests/create/account.create.request.dto';
import { AccountEntity } from '../../../../domain/entities/account.entity';

@Injectable()
export class AccountRequestDtoMapper {
  convertToEntity(dto: AccountCreateRequestDto): AccountEntity {
    const { name } = dto;
    return {
      name,
    } as AccountEntity;
  }
}
