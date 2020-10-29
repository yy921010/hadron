import { Injectable } from '@nestjs/common';
import { UserService } from '../user';
import { HelperService } from '../share/helper.service';
import { JwtService } from '@nestjs/jwt';
import { getLogger } from '../common';
import { Logger } from 'log4js';
import { User } from '../user/schema/user.schema';

@Injectable()
export class AuthService {
  private logger: Logger = getLogger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly helperService: HelperService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username);
    if (this.helperService.isEmpty(user)) {
      this.logger.error('[validateUser] msg -> 用户不存在');
      return null;
    }
    if ('' + user.isAdmin === '0') {
      this.logger.error('[validateUser] msg -> 用户管理员无法登录');
      return null;
    }
    const cryptPassword = this.helperService.cryptoMd5(password + user.userId);
    if (user.password !== cryptPassword) {
      this.logger.error('[validateUser] msg -> 密码错误');
      return null;
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
