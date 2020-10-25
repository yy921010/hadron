import { IsString } from 'class-validator';

export class UserAuthDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
}
