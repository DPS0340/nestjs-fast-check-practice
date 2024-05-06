import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AccountRepository {
  private readonly logger = new Logger(AccountRepository.name);

  constructor() {}
}
