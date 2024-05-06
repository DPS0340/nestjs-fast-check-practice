import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AccountController {
  private readonly logger = new Logger(AccountEntity.name);

  constructor() {}
}
