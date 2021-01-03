import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';
import { ShareModule } from '../share/share.module';
import { UserDao } from './services/user.dao';

@Module({
  imports: [ShareModule],
  providers: [UserService, UserDao],
  controllers: [UserController],
  exports: [UserService, UserDao],
})
export class UserModule {}
