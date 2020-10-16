import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  saveUser(@Body() user: UserCreateDto): Promise<any> {
    return this.userService.saveUser(user);
  }

  @Get()
  getAllUser() {
    return this.userService.findAll();
  }
}
