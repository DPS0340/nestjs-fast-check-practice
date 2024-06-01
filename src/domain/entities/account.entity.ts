import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { TransferEntity, TransferType } from './transfer.entity';

@Entity()
export class AccountEntity {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  name!: string;

  // See https://mikro-orm.io/docs/defining-entities#virtual-properties
  @Property()
  getBalance() {
    return this.transfers
      .map((e) => {
        if (e.type === TransferType.Deposit) {
          return e.amount;
        }
        if (e.type === TransferType.Withdrawal) {
          return -e.amount;
        }
        return 0;
      })
      .reduce((a, b) => a + b, 0);
  }

  @Property({ columnType: 'bigint' })
  rawBalance: number = 0;

  @OneToMany(() => TransferEntity, (e) => e.account, {
    cascade: [Cascade.ALL],
  })
  transfers = new Collection<TransferEntity>(this);
}
