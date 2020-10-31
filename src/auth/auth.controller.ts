import { Body, Controller, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/oauth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('local'))
  async userLogin(@Body() userAuthDto: UserAuthDto): Promise<any> {
    //todo: 此处存在两次调用风险
    const user = await this.authService.validateUser(userAuthDto.username, userAuthDto.password);
    return await this.authService.login(user);
  }
}
