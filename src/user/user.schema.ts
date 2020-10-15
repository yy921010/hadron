import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop()
  username: string;
  password: string;
  nickName: string;
  isAdmin: number;
  userId: string;
  updateTime: string;
  createTime: string;
  pin: number;
  isSub: number;
  accountNonExpired: number;
  accountNonLocked: number;
  credentialsNonExpired: number;
  enable: number;
  mail: number;
  mailCode: number;
  role: string;
  ageLevel: string;
  clientLimit: number;
  avatarUrl: string;
  client;
  isOnline;
  isLocked;
}

export const UserSchema = SchemaFactory.createForClass(User);
