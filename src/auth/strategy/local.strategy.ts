import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { BaseException, Log4j } from '../../common';
import { ChannelError } from '../../live/errorCode/channel.error';
import { Logger } from 'log4js';

@Injectable()
@Log4j
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger: Logger;
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      this.logger.error('[validate] msg ->', '用户不存在');
      throw new BaseException(ChannelError.CHANNEL_UPDATE_FAIL);
    }
    return user;
  }
}
