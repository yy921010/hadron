import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Channel } from './schema/channel.schema';
import { Model } from 'mongoose';
import { Log4j } from '../common';
import { Logger } from 'log4js';
import { PageInfoInterface } from '../core/interfaces/page-info.interface';
import { ChannelUpdateDto } from './dto/channelCreateDto';

@Injectable()
@Log4j
export class LiveService {
  private logger: Logger;
  constructor(@InjectModel(Channel.name) private readonly channelModel: Model<Channel>) {}

  async save(channel: Channel): Promise<boolean> {
    const createChannel = new this.channelModel(channel);
    const channelResult = await createChannel.save();
    this.logger.debug('[saveChannel] channelResult = ', channelResult);
    if (channelResult.name) {
      this.logger.info('[channelSave] msg = ', '频道新增成功');
      return true;
    }
    this.logger.warn('[saveChannel] msg = ', '频道新增失败');
    return false;
  }

  async find(pageNumber: number, pageSize: number): Promise<PageInfoInterface> {
    const findResult = await Promise.all([
      this.channelModel
        .find({})
        .where({
          isDeleted: 0,
        })
        .skip(pageNumber * pageSize)
        .limit(pageNumber)
        .sort({
          updateTime: -1,
        })
        .exec(),
      this.channelModel.countDocuments({}),
    ]);
    return {
      list: findResult[0],
      total: findResult[1],
      current: pageNumber,
      size: pageSize,
    };
  }

  async update(channelUpdateDto: ChannelUpdateDto) {
    const updateResult = await this.channelModel.findByIdAndUpdate(
      {
        _id: channelUpdateDto._id,
      },
      {
        $set: channelUpdateDto,
      },
    );
    if (updateResult.name) {
      this.logger.info('[saveUser] msg = ', '频道更新成功');
      return true;
    }
    this.logger.warn('[saveUser] msg = ', '频道更新失败');
    return false;
  }

  async deleteUser(channelId: string): Promise<any> {
    const deleteResult = await this.channelModel.findByIdAndUpdate(
      {
        _id: channelId,
      },
      {
        $set: {
          isDeleted: 1,
        },
      },
    );
    if (deleteResult.name) {
      this.logger.info('[deleteUser] msg=', '删除用户成功');
      return true;
    }
    return false;
  }
}
