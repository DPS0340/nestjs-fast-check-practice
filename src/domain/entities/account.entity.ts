import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { TransferEntity } from './transfer.entity';

@Entity()
export class AccountEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property()
  balance: number = 0;

  @OneToMany(() => TransferEntity, (e) => e.account, {
    cascade: [Cascade.ALL],
  })
  transfers = new Collection<TransferEntity>(this);
}
