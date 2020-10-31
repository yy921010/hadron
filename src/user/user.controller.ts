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
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async saveUser(@Body() user: UserCreateDto): Promise<any> {
    return this.userService.save(user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUsersByPage(@Query('pageSize') pageSize: string, @Query('pageNumber') pageNumber: string) {
    return await this.userService.find(pageNumber, pageSize);
  }

  @Put()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Body() user: UserUpdateDto) {
    return this.userService.update(user);
  }

  @Delete(':userId')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param() params: any) {
    return this.userService.deleteUser(params.userId);
  }

  @Get(':username')
  @UseGuards(AuthGuard('jwt'))
  async getUserInfo(@Param() params: any) {
    return this.userService.getUserInfo(params.username);
  }
}
