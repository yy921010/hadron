import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({})
export class Picture extends Document {
  @Prop({
    type: String,
    default: '',
  })
  name: string;
  @Prop({
    type: String,
    default: '',
  })
  href: string;
  @Prop({
    type: String,
    default: '',
  })
  imageType: string;
}

export const PictureSchema = SchemaFactory.createForClass(Picture);
