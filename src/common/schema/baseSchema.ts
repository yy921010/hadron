import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';

export class BaseSchema extends Document {
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
