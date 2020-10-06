import { Injectable } from '@nestjs/common';
import { Logger } from 'log4js';
import { Log } from './decorator';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';

@Injectable()
@Log
export class AppService {
  private log: Logger;
  async getHello(): Promise<string> {
    return 'hello world';
  }
  @Client({
    transport: Transport.GRPC,
    options: {
      url:'localhost:33027',
      package: 'user', // ['hero', 'hero2']
      protoPath: './src/user/user.proto' // ['./hero/hero.proto', './hero/hero2.proto']
    },
  }) public readonly client: ClientGrpc;
}
