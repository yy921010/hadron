import { User } from '../schema/user.schema';

export class UserCreateDto {
  readonly _id: string;
  readonly username: string;
  readonly password: string;
  readonly pin: string;
  readonly nickName: string;
  userId: string;
  readonly accountNonExpired: number;
  readonly accountNonLocked: number;
  readonly credentialsNonExpired: number;
  readonly enable: number;
  readonly mail: string;
  readonly mailCode: number;
  readonly role: string;
  readonly ageLevel: string;
  readonly clientLimit: number;
  readonly avatar: string;
  readonly authType: string;
}
export class UserUpdateDto extends User {}
