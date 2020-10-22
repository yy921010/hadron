import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PhysicalChannel, PhysicalChannelSchema } from './physicalChannel.schema';
import { Picture, PictureSchema } from './picture.schema';

@Schema({
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
})
export class Channel extends Document {
  @Prop({
    type: String,
    default: '',
    required: true,
  })
  name: string;
  @Prop({
    type: String,
    default: '',
    required: true,
  })
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
    type: [PhysicalChannelSchema],
  })
  physicalChannels: PhysicalChannel[];
  @Prop({
    type: [PictureSchema],
  })
  pictures: Picture[];
  @Prop({
    default: 0,
    type: Number,
  })
  isDeleted: number;
}

export const ChannelSchemas = SchemaFactory.createForClass(Channel);
