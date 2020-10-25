import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { Logger } from 'log4js';
import { Log4j } from './common';
import { ConfigService } from './core';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@Log4j
export class AppController {
  private logger: Logger;
  constructor(private readonly config: ConfigService) {}

  @Post()
  @UseGuards(AuthGuard('local'))
  async getHello(): Promise<any> {
    return {
      version: this.config.get('version'),
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
