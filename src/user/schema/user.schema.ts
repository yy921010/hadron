import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User extends Document {
  @Prop({
    required: true,
  })
  username: string;
  @Prop({
    required: true,
  })
  password: string;
  @Prop()
  nickName: string;
  @Prop()
  isAdmin: number;
  @Prop()
  userId: string;
  @Prop()
  updateTime: string;
  @Prop()
  createTime: string;
  @Prop()
  pin: number;
  @Prop()
  isSub: number;
  @Prop()
  accountNonExpired: number;
  @Prop()
  accountNonLocked: number;
  @Prop()
  credentialsNonExpired: number;
  @Prop()
  enable: number;
  @Prop()
  mail: number;
  @Prop()
  mailCode: number;
  @Prop()
  role: string;
  @Prop()
  ageLevel: string;
  @Prop()
  clientLimit: number;
  @Prop()
  avatarUrl: string;
  @Prop()
  isOnline: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
