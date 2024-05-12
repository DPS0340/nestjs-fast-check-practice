import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { AccountResponseDto } from '../dtos/response/account.response.dto';
import { AccountsUseCases } from 'src/application/use-cases/account.use-case';
import { AccountCreateRequestDto } from '../dtos/requests/create/account.create.request.dto';

@Controller('accounts')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);

  constructor(private readonly accountUseCases: AccountsUseCases) {}

  @Post()
  async create(
    @Body() data: AccountCreateRequestDto,
  ): Promise<AccountResponseDto> {
    return this.accountUseCases.create(data);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<AccountResponseDto> {
    return this.accountUseCases.findById(id);
  }
}
