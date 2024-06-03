import {
  EntityManager,
  EntityRepository,
  IsolationLevel,
  LockMode,
  raw,
} from '@mikro-orm/core';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AccountEntity } from '../../domain/entities/account.entity';
import {
  TransferEntity,
  TransferType,
} from '../../domain/entities/transfer.entity';
import { AccountRequestDtoMapper } from '../../presentation/dtos/mappers/requests/account.request.dto.mapper';
import { AccountResponseDtoMapper } from '../../presentation/dtos/mappers/responses/account.response.dto.mapper';
import { AccountCreateRequestDto } from '../../presentation/dtos/requests/create/account.create.request.dto';
import { TransferCreateRequestDto } from '../../presentation/dtos/requests/create/transfer.create.request.dto';
import { AccountResponseDto } from '../../presentation/dtos/response/account.response.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { TransferResponseDtoMapper } from '../../presentation/dtos/mappers/responses/transfer.response.dto.mapper';
import { TransferResponseDto } from '../../presentation/dtos/response/transfer.response.dto';

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
    private readonly transferResponseDtoMapper: TransferResponseDtoMapper,
  ) {}

  async findAll(): Promise<AccountEntity[]> {
    return this.accountRepository.findAll();
  }

  async findById(id: number): Promise<AccountResponseDto> {
    const entity = await this.accountRepository.findOneOrFail(
      { id },
      { populate: ['transfers'] },
    );
    return this.accountResponseDtoMapper.convertToDto(entity);
  }

  async create(data: AccountCreateRequestDto): Promise<AccountResponseDto> {
    console.log({ data });
    const entity = await this.accountRepository.create(data);

    await this.em.persistAndFlush(entity);

    console.log({ entity });
    console.log({ transfers: entity.transfers });
    console.log({ transfersLength: entity.transfers.length });

    return this.accountResponseDtoMapper.convertToDto(entity);
  }

  async transfer(data: TransferCreateRequestDto): Promise<TransferResponseDto> {
    const account = await this.accountRepository.findOneOrFail(
      {
        id: data.accountId,
      },
      { populate: ['transfers'], lockMode: LockMode.PESSIMISTIC_WRITE },
    );
    if (data.amount <= 0) {
      // Validation check handling
      throw new HttpException(
        'Amount has to be more than 0',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.em.transactional(
      async (em) => {
        const accountRef = this.accountRepository.getReference(account.id);
        if (data.type === TransferType.Deposit) {
          accountRef.rawBalance += 1;
        } else if (data.type === TransferType.Withdrawal) {
          accountRef.rawBalance -= 1;
        }
        await em.persistAndFlush(accountRef);
      },
      { isolationLevel: IsolationLevel.SERIALIZABLE },
    );

    const transfer = await this.em.transactional(
      async (em) => {
        const accountRef = this.accountRepository.getReference(account.id);
        const transfer = this.transferRepository.create({
          amount: data.amount,
          type: data.type,
        });

        await accountRef.transfers.loadItems();
        accountRef.transfers.add(transfer);

        await em.persist(transfer).persist(accountRef).flush();
        return transfer;
      },
      { isolationLevel: IsolationLevel.SERIALIZABLE },
    );

    return this.transferResponseDtoMapper.convertToDto(transfer);
  }
}
