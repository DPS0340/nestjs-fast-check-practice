import fc from 'fast-check';
import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountsUseCases } from 'src/application/use-cases/account.use-case';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { INestApplication } from '@nestjs/common';
import { AccountCreateRequestDto } from '../dtos/requests/create/account.create.request.dto';

describe('AccountController', () => {
  let app: INestApplication;
  let accountController: AccountController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AccountsUseCases, AccountEntity],
      controllers: [AccountController],
      providers: [],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    accountController = app.get<AccountController>(accountController);
  });

  describe('root', () => {
    it('should success to create user', async () => {
      await fc.assert(
        fc.asyncProperty(fc.string(), async (name) => {
          const requestDto: AccountCreateRequestDto = {
            name,
          };
          const responseDto = await accountController.create(requestDto);
          expect(responseDto.name).toEqual(name);
          expect(responseDto.id).toEqual(expect.any(String));
          expect(responseDto.balance).toEqual(0);
        }),
      );
    });
    it('should get user using id from create user', () => {
      expect(accountController.getHello()).toBe('Hello World!');
    });
  });
});
