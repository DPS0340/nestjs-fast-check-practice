import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AccountsUseCases {
  private readonly logger = new Logger(AccountsUseCases.name);

  constructor() {}
}
