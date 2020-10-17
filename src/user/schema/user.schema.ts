import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
})
export class User extends Document {
  @Prop({
    required: true,
  })
  username: string;
  @Prop({
    required: true,
  })
  password: string;
  @Prop({
    default: '0000',
  })
  pin: string;
  @Prop({
    default: '',
  })
  nickName: string;
  @Prop({
    default: 'userId_',
  })
  userId: string;
  @Prop({
    default: 0,
  })
  accountNonExpired: number;
  @Prop({
    default: 0,
  })
  accountNonLocked: number;
  @Prop({
    default: 0,
  })
  credentialsNonExpired: number;
  @Prop({
    default: 0,
  })
  enable: number;
  @Prop({
    default: '',
  })
  mail: string;
  @Prop({
    default: '',
  })
  mailCode: string;
  @Prop({
    default: '18',
  })
  ageLevel: string;
  @Prop({
    default: 5,
  })
  clientLimit: number;
  @Prop({
    default: '',
  })
  avatar: string;
  @Prop({
    default: '',
  })
  authType: string;

  @Prop({
    default: 0,
    type: Number,
  })
  isDeleted: number;

  @Prop({
    default: '',
    type: Number,
  })
  updateTime: number;
  @Prop({
    default: '',
    type: Number,
  })
  createTime: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
