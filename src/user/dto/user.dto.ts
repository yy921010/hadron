export class UserCreateDto {
  readonly username: string;
  readonly password: string;
  readonly nickName: string;
  readonly isAdmin: number;
  readonly pin: number;
  //用户账号没有过期
  readonly accountNonExpired: number;
  //用户账号没有锁定
  readonly accountNonLocked: number;
  //验证是否有效
  readonly credentialsNonExpired: number;

  readonly enable: number;

  readonly mail: number;

  readonly mailCode: number;

  readonly role: string;

  readonly ageLevel: string;

  readonly clientLimit: number;

  //是否在线
  readonly isOnline: number;
}
