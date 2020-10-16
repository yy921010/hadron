import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
  async getAllUser() {
    return await this.userService.findByPage(2, 2);
  }

  @Get()
  async getUsersByPage(@Query('pageSize') pageSize: number, @Query('pageNumber') pageNumber: number) {
    return await this.userService.findByPage(pageNumber, pageSize);
  }
}
