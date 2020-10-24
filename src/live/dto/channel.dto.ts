import { PhysicalChannel } from '../schema/physicalChannel.schema';
import { Picture } from '../schema/picture.schema';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

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

export class ChannelUpdateDto {
  @IsString()
  @IsNotEmpty()
  readonly id: string;
  @IsString()
  name: string;
  @IsString()
  channelNo: string;
  @ValidateNested()
  physicalChannels: PhysicalChannel[];
  @ValidateNested()
  pictures: Picture[];
}
