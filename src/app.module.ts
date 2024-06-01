import { Module } from '@nestjs/common';
import { AccountModule } from './infrastructure/ioc/account.module';

@Module({
  imports: [AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
