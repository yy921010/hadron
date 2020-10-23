import { Channel } from '../schema/channel.schema';

export class ChannelCreateDto extends Channel {
  readonly _id: string;
}
export class ChannelUpdateDto extends Channel {
  readonly _id: string;
}
