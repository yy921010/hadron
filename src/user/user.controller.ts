import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from './dto/user.dto';
import { UserService } from './services/user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async saveUser(@Body() user: UserCreateDto): Promise<any> {
    return this.userService.save(user);
  }

  @Get()
  async getUsersByPage(@Query('pageSize') pageSize: string, @Query('pageNumber') pageNumber: string) {
    return await this.userService.find(pageNumber, pageSize);
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateUser(@Body() user: UserUpdateDto) {
    return this.userService.update(user);
  }

  @Delete(':userId')
  async deleteUser(@Param() params: any) {
    return this.userService.deleteUser(params.userId);
  }

  @Get(':username')
  async getUserInfo(@Param() params: any) {
    return this.userService.getUserInfo(params.username);
  }
}
