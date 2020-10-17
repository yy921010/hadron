import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PhysicalChannel } from '../interfaces/physcialChannel.interfalce';
import { Picture } from '../interfaces/picture.interface';

@Schema({
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
})
export class Channel extends Document {
  @Prop()
  name: string;
  @Prop()
  channelNo: string;
  @Prop({
    type: Number,
  })
  createTime: number;
  @Prop({
    type: Number,
  })
  updateTime: number;
  @Prop({
    type: [],
  })
  physicalChannels: PhysicalChannel[];
  @Prop([])
  pictures: Picture[];
}
