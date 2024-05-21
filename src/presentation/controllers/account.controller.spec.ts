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

  describe('root', () => {
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
  });
});
