import { IsString } from 'class-validator';

export class AccountCreateRequestDto {
  @IsString()
  name: string;
}
