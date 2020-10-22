import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PhysicalChannel extends Document {
  @Prop({
    default: '',
    type: String,
  })
  @Prop({
    type: String,
    default: '',
  })
  name: string;
  @Prop({
    default: '',
    type: String,
  })
  playUrl: string;
}

export const PhysicalChannelSchema = SchemaFactory.createForClass(PhysicalChannel);
