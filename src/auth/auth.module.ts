import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ShareModule } from '../share/share.module';
import { UserModule } from '../user';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigService, CoreModule } from '../core';

@Module({
  imports: [
    CoreModule,
    ShareModule,
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [CoreModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('jwtConfig'),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
