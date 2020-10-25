import { Injectable } from '@nestjs/common';
import { UserService } from '../user';
import { HelperService } from '../share/helper.service';
import { JwtService } from '@nestjs/jwt';
import { BaseException, Log4j } from "../common";
import { Logger } from 'log4js';
import { User } from "../user/schema/user.schema";
import { AuthError } from "./errorCode/auth.error";

@Injectable()
@Log4j
export class AuthService {
  private logger: Logger;
  constructor(
    private readonly userService: UserService,
    private readonly helperService: HelperService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username);
    if (this.helperService.isEmpty(user)) {
      this.logger.error('[validateUser] msg -> 用户不存在');
      throw new BaseException(AuthError.USER_NOT_FOUND)
    }
    if (user.password !== password) {
      this.logger.error('[validateUser] msg -> 密码错误');
      throw new BaseException(AuthError.PASSWORD_ERROR)
    }
    return user;
  }

  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user.userId,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
