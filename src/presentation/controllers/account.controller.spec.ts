import fc from 'fast-check';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountsUseCases } from '../../application/use-cases/account.use-case';
import { AccountEntity } from '../../domain/entities/account.entity';
import { INestApplication } from '@nestjs/common';
import { AccountCreateRequestDto } from '../dtos/requests/create/account.create.request.dto';
import { TransferEntity } from '../../domain/entities/transfer.entity';
import { AccountRequestDtoMapper } from '../dtos/mappers/requests/account.request.dto.mapper';
import { AccountResponseDtoMapper } from '../dtos/mappers/responses/account.response.dto.mapper';
import { SqliteDriver } from '@mikro-orm/sqlite';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TransferRequestDtoMapper } from '../dtos/mappers/requests/transfer.request.dto.mapper';
import { TransferResponseDtoMapper } from '../dtos/mappers/responses/transfer.response.dto.mapper';
import { MikroORM } from '@mikro-orm/core';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { TransferCreateRequestDto } from '../dtos/requests/create/transfer.create.request.dto';

describe('AccountController', () => {
  let app: INestApplication;
  let accountController: AccountController;

  beforeEach(async () => {
    const mikroOrmConfig = {
      autoLoadEntities: true,
      allowGlobalContext: true,
      dbName: 'test.db.sqlite3',
      driver: SqliteDriver,
      extensions: [EntityGenerator, Migrator],
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRoot(mikroOrmConfig),
        MikroOrmModule.forFeature({
          entities: [AccountEntity, TransferEntity],
        }),
      ],
      controllers: [AccountController],
      providers: [
        TransferEntity,
        AccountEntity,
        AccountsUseCases,
        TransferRequestDtoMapper,
        TransferResponseDtoMapper,
        AccountRequestDtoMapper,
        AccountResponseDtoMapper,
      ],
      exports: [AccountsUseCases],
    }).compile();

    const orm = moduleFixture.get<MikroORM>(MikroORM);
    await orm.getMigrator().up();

    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();

    app = moduleFixture.createNestApplication();
    await app.init();

    accountController = moduleFixture.get<AccountController>(AccountController);
  });

  it('should success to create user', async () => {
    await fc.assert(
      fc.asyncProperty(fc.string(), async (name) => {
        const requestDto: AccountCreateRequestDto = {
          name,
        };
        const {
          name: accountName,
          id,
          balance,
        } = await accountController.create(requestDto);
        expect(accountName).toEqual(name);
        expect(id).toEqual(expect.any(Number));
        expect(balance).toEqual(0);
      }),
    );
  });
  it('should get user using id from create user', async () => {
    await fc.assert(
      fc.asyncProperty(fc.string(), async (name) => {
        const requestDto: AccountCreateRequestDto = {
          name,
        };
        const { id } = await accountController.create(requestDto);

        const responseDto = await accountController.findById(id);

        expect(responseDto.id).toEqual(id);
        expect(responseDto.name).toEqual(requestDto.name);
        expect(responseDto.balance).toEqual(0);
      }),
    );
  });
  it('should final amount is 0 from +- amount transfers', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.string(),
        fc.array(fc.nat()),
        async (name, amounts) => {
          const requestDto: AccountCreateRequestDto = {
            name,
          };
          const { id } = await accountController.create(requestDto);

          let userDto = await accountController.findById(id);

          expect(userDto.id).toEqual(id);
          expect(userDto.name).toEqual(requestDto.name);
          expect(userDto.balance).toEqual(0);
          expect(userDto.rawBalance).toEqual(0);

          await Promise.allSettled(
            amounts
              .flatMap((e) =>
                [e, e].map(
                  (amount, idx) =>
                    ({
                      type: ['deposit', 'withdraw'][idx],
                      accountId: id,
                      amount,
                    }) as TransferCreateRequestDto,
                ),
              )
              .map((e) => accountController.transfer(id, e)),
          );

          userDto = await accountController.findById(id);

          expect(userDto.id).toEqual(id);
          expect(userDto.name).toEqual(requestDto.name);
          expect(userDto.balance).toEqual(0);
          expect(userDto.rawBalance).toEqual(0);
        },
      ),
    );
  }, 500000);
});
