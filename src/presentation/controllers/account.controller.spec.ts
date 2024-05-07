import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountsUseCases } from 'src/application/use-cases/account.use-case';
import { AccountEntity } from 'src/domain/entities/account.entity';
import { AccountRepository } from 'src/infrastructure/persistence/account.repository';

describe('AccountController', () => {
  let accountController: AccountController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AccountsUseCases, AccountEntity, AccountRepository],
      controllers: [AccountController],
      providers: [],
    }).compile();

    accountController = app.get<AccountController>(accountController);
  });

  describe('root', () => {
    // it('should return "Hello World!"', () => {
    //   expect(accountController.getHello()).toBe('Hello World!');
    // });
  });
});
