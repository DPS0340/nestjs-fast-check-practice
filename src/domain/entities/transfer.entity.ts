import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { AccountEntity } from './account.entity';

export enum TransferType {
  Deposit = 'deposit',
  Withdrawal = 'withdraw',
}

@Entity()
export class TransferEntity {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @ManyToOne({ entity: () => AccountEntity })
  account!: AccountEntity;

  @Property()
  amount!: number;

  @Enum(() => TransferType)
  type!: TransferType;
}
