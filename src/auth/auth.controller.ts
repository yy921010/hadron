import { Body, Controller, Get, Header, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('local'))
  async userLogin(@Body() userAuthDto: UserAuthDto): Promise<any> {
    const user = await this.authService.validateUser(userAuthDto.username, userAuthDto.password);
    return await this.authService.login(user);
  }
}
