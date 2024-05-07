import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class AccountEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;
}
