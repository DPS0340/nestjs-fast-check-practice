import { Controller, Get, Logger, Post } from '@nestjs/common';
import { AccountResponseDto } from '../dtos/response/account.response.dto';
import { AccountsUseCases } from 'src/application/use-cases/account.use-case';
import { AccountRequestDtoMapper } from '../dtos/mappers/requests/account.request.dto.mapper';

@Controller('accounts')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);

  constructor(
    private readonly accountUseCases: AccountsUseCases,
    private readonly accountRequestDtoMapper: AccountRequestDtoMapper,
  ) {}

  @Post()
  create(): AccountResponseDto[] {
    this.accountUseCases.create;
  }

  @Get(':id')
  async findById(): Promise<AccountResponseDto[]> {
    const accounts = await this.accountUseCases.findAll();
    this.accountRequestDtoMapper.convertToDto(accounts);
  }
}
