import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { Log } from './decorator';
import { ConfigService } from './config';
import { Logger } from 'log4js';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

export  interface HeroById{
  id:number
}
export interface Hero{
  id:number
  name:string
}
interface UserService {
  findOne(data: HeroById): Observable<Hero>;
  findMany(upstream: Observable<HeroById>): Observable<Hero>;
}

@Log
@Controller()
export class AppController implements OnModuleInit{
  private log: Logger;
  private userService
  constructor(private readonly config: ConfigService,private appService:AppService) {}

  @Get()
  async getHello(): Promise<any> {
    const a = this.userService.findOne({
      id:1
    })
    a.subscribe((c)=>{
      console.log('a?????',c)
    })

    return {
      version: this.config.get('version'),
    };
  }

  onModuleInit(): any {
    this.userService = this.appService.client.getService<UserService>('UserService')
  }
}
