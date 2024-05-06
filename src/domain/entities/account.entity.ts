import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AccountEntity {
  private readonly logger = new Logger(AccountEntity.name);

  constructor() {}
}
