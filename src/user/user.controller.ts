import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async saveUser(@Body() user: UserCreateDto): Promise<any> {
    await this.userService.save(user);
    return {
      message: '新增成功',
    };
  }

  @Get()
  async getUsersByPage(@Query('pageSize') pageSize: number, @Query('pageNumber') pageNumber: number) {
    return await this.userService.find(pageNumber, pageSize);
  }

  @Put()
  async updateUser(@Body() user: UserUpdateDto) {
    await this.userService.update(user);
    return {
      message: '更新成功',
    };
  }
  @Delete(':userId')
  async deleteUser(@Param() params: any) {
    await this.userService.deleteUser(params.userId);
    return {
      message: '删除成功',
    };
  }
}
