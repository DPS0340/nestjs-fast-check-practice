import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { TransferEntity } from 'src/domain/entities/transfer.entity';
import { AccountRequestDtoMapper } from 'src/presentation/dtos/mappers/requests/account.request.dto.mapper';
import { AccountResponseDtoMapper } from 'src/presentation/dtos/mappers/responses/account.response.dto.mapper';
import { AccountCreateRequestDto } from 'src/presentation/dtos/requests/create/account.create.request.dto';
import { TransferCreateRequestDto } from 'src/presentation/dtos/requests/create/transfer.create.request.dto';
import { AccountResponseDto } from 'src/presentation/dtos/response/account.response.dto';

@Injectable()
export class AccountsUseCases {
  private readonly logger = new Logger(AccountsUseCases.name);

  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: EntityRepository<AccountEntity>,
    @InjectRepository(TransferEntity)
    private readonly transferRepository: EntityRepository<TransferEntity>,
    private readonly em: EntityManager,
    private readonly accountRequestDtoMapper: AccountRequestDtoMapper,
    private readonly accountResponseDtoMapper: AccountResponseDtoMapper,
  ) {}

  async findAll(): Promise<AccountEntity[]> {
    return this.accountRepository.findAll();
  }

  async findById(id: number): Promise<AccountResponseDto> {
    const entity = await this.accountRepository.findOneOrFail({ id });
    return this.accountResponseDtoMapper.convertToDto(entity);
  }

  async create(data: AccountCreateRequestDto): Promise<AccountResponseDto> {
    const entity = this.accountRequestDtoMapper.convertToEntity(data);
    await this.accountRepository.create(data);
    await this.em.flush();

    return this.accountResponseDtoMapper.convertToDto(entity);
  }

  async transfer(data: TransferCreateRequestDto) {
    const account = await this.accountRepository.findOneOrFail({
      id: data.accountId,
    });
    if (data.amount <= 0) {
      // Validation check handling
      throw new HttpException(
        'Amount has to be more than 0',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.transferRepository.create({
      account: account,
      amount: data.amount,
      type: data.type,
    });
    await this.em.flush();
  }
}
