import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PhysicalChannel extends Document {
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
