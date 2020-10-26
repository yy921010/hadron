import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { Logger } from 'log4js';
import { getLogger } from './common';
import { ConfigService } from './core';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  private logger: Logger = getLogger(AppController.name);
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
