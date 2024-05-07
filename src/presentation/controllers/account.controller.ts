import { Controller, Get, Logger } from '@nestjs/common';
import { AccountResponseDto } from '../dtos/response/account.response.dto';

@Controller('accounts')
export class AccountController {
  private readonly logger = new Logger(AccountController.name);

  constructor() {}

  @Get(':id')
  findById(): AccountResponseDto[] {}
}
