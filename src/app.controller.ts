import { Controller, Get, Post, UseGuards, Request, Inject } from '@nestjs/common';
import { Logger } from 'log4js';
import { getLogger } from './common';
import { ConfigService } from './core';
import { AuthGuard } from '@nestjs/passport';
import { OAuth2Service } from './core/interfaces/oAuth2Service.interface';
import { ClientGrpc } from '@nestjs/microservices';

@Controller()
export class AppController {
  private OAuth2Service;
  private logger: Logger = getLogger(AppController.name);
  constructor(private readonly config: ConfigService, @Inject('OAUTH2_PACKAGE') private readonly client: ClientGrpc) {}
  onModuleInit(): any {
    this.OAuth2Service = this.client.getService<OAuth2Service>('OAuth2Service');
  }
  @Post()
  @UseGuards(AuthGuard('local'))
  async getHello(): Promise<any> {
    return {
      version: this.config.get('version'),
    };
  }

  @Get()
  async getHello1(): Promise<any> {
    return this.OAuth2Service.authenticate({
      authorization: 'Bearer 995ceee5063d376c66b221362ab3b3a4861b4c2f',
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
