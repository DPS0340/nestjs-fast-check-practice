import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AccountEntity } from '../../domain/entities/account.entity';
import { TransferEntity } from '../../domain/entities/transfer.entity';
import { AccountRequestDtoMapper } from '../../presentation/dtos/mappers/requests/account.request.dto.mapper';
import { AccountResponseDtoMapper } from '../../presentation/dtos/mappers/responses/account.response.dto.mapper';
import { AccountCreateRequestDto } from '../../presentation/dtos/requests/create/account.create.request.dto';
import { TransferCreateRequestDto } from '../../presentation/dtos/requests/create/transfer.create.request.dto';
import { AccountResponseDto } from '../../presentation/dtos/response/account.response.dto';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class AccountsUseCases {
  private readonly logger = new Logger(AccountsUseCases.name);

  constructor(
    private readonly em: EntityManager,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: EntityRepository<AccountEntity>,
    @InjectRepository(TransferEntity)
    private readonly transferRepository: EntityRepository<TransferEntity>,
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
    const entity = await this.accountRepository.create(data);

    console.log({ entity });

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
