import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { AccountEntity } from './account.entity';

export enum TransferType {
  Deposit = 'deposit',
  Withdrawal = 'withdraw',
}

@Entity()
export class TransferEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ primary: true, entity: () => AccountEntity })
  account: AccountEntity;

  @Property()
  amount!: number;

  @Enum(() => TransferType)
  type!: TransferType;
}
