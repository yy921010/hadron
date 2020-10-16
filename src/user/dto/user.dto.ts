export class UserCreateDto {
  readonly username: string;

  readonly password: string;

  readonly pin: number;

  readonly nickName: string;

  readonly isAdmin: number;

  readonly userId: string;

  readonly isSub: number;

  readonly accountNonExpired: number;

  readonly accountNonLocked: number;

  readonly credentialsNonExpired: number;

  readonly enable: number;

  readonly mail: number;

  readonly mailCode: number;

  readonly role: string;

  readonly ageLevel: string;

  readonly clientLimit: number;

  readonly avatar: string;

  readonly authType: string;

  readonly updateTime: string;

  readonly createTime: string;
}
