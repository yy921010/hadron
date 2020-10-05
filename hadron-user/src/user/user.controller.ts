import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

export  interface HeroById{
  id:number
}
export interface Hero{
  id:number
  name:string
}
@Controller()
export class UserController {

  @GrpcMethod("UserService")
  findOne(data: HeroById, metadata: any): Hero {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }
}
