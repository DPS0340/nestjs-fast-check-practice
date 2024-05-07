import { Entity, Enum, PrimaryKey, Property } from '@mikro-orm/core';

export enum TransferType {
  Deposit = 'deposit',
  Withdrawal = 'withdraw',
}

@Entity()
export class TransferEntity {
  @PrimaryKey()
  id: number;

  @Property()
  amount!: number;

  @Enum(() => TransferType)
  type!: TransferType;
}
