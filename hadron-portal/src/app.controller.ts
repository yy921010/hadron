import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Log } from './decorator';
import { ConfigService } from './config';
import { Logger } from 'log4js';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Log
@Controller()
export class AppController implements OnModuleInit{
  private log: Logger;
  private userService
  constructor(private readonly config: ConfigService,private appService:AppService) {}

  @Get()
  async getHello(): Promise<any> {
    const a = await this.userService.findOne({
      id:1
    })
    console.log(a);
    return {
      version: this.config.get('version'),
    };
  }

  onModuleInit(): any {
    this.userService = this.appService.client.getService<any>('UserService')
  }
}
