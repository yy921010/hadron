import { Channel } from '../schema/channel.schema';
import { PhysicalChannel, PhysicalChannelSchema } from '../schema/physicalChannel.schema';
import { Picture, PictureSchema } from '../schema/picture.schema';
import { IsArray, IsString, ValidateNested } from 'class-validator';

export class ChannelCreateDto {
  @IsString()
  name: string;
  @IsString()
  channelNo: string;
  @ValidateNested()
  physicalChannels: PhysicalChannel[];
  @ValidateNested()
  pictures: Picture[];
}
export class ChannelUpdateDto extends Channel {
  readonly _id: string;
}
