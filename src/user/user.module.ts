import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { ShareModule } from '../share/share.module';

@Module({
  imports: [
    ShareModule,
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', () => console.log('pre save hook'));
          return schema;
        },
      },
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
