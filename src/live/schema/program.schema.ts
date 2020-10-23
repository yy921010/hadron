import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../common';
import { Picture, PictureSchema } from './picture.schema';

@Schema({
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
})
export class Program extends BaseSchema {
  @Prop({
    default: '',
    type: String,
  })
  name: string;
  @Prop()
  subName: string;
  @Prop()
  channelId: string;
  @Prop()
  startTime: number;
  @Prop()
  endTime: number;
  @Prop()
  introduce: string;
  @Prop()
  subNum: number;
  @Prop()
  season: number;
  @Prop([Number])
  genres: number[];
  @Prop()
  ratingId: number;
  //关联vod id
  @Prop()
  externalIds: string;
  @Prop({
    type: [PictureSchema],
  })
  pictures: Picture[];
}

export const ProgramSchema = SchemaFactory.createForClass(Program);
