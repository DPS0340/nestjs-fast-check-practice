import { IsString } from 'class-validator';
import { z } from 'zod';

export class AccountCreateRequestDto {
  @IsString()
  name: string;
}

export const AccountCreateRequestDtoSchema = z.instanceof(
  AccountCreateRequestDto,
);
