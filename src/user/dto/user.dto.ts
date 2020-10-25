import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserCreateDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly pin: string;
  @IsString()
  readonly nickName: string;
  @IsString()
  userId: string;
  @IsNumber()
  readonly accountNonExpired: number;
  @IsNumber()
  readonly accountNonLocked: number;
  @IsNumber()
  readonly credentialsNonExpired: number;
  @IsNumber()
  readonly enable: number;
  @IsEmail()
  readonly mail: string;
  @IsNumber()
  readonly mailCode: string;
  @IsString()
  readonly role: string;
  @IsString()
  readonly ageLevel: string;
  @IsNumber()
  readonly clientLimit: number;
  @IsString()
  readonly avatar: string;
  @IsString()
  readonly authType: string;
}

export class UserUpdateDto {
  @IsString()
  readonly id: string;
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly pin: string;
  @IsString()
  readonly nickName: string;
  @IsString()
  userId: string;
  @IsNumber()
  readonly accountNonExpired: number;
  @IsNumber()
  readonly accountNonLocked: number;
  @IsNumber()
  readonly credentialsNonExpired: number;
  @IsNumber()
  readonly enable: number;
  @IsEmail()
  readonly mail: string;
  @IsNumber()
  readonly mailCode: string;
  @IsString()
  readonly role: string;
  @IsString()
  readonly ageLevel: string;
  @IsNumber()
  readonly clientLimit: number;
  @IsString()
  readonly avatar: string;
  @IsString()
  readonly authType: string;
}
