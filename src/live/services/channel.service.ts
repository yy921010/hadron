import { Logger } from 'log4js';
import { InjectModel } from '@nestjs/mongoose';
import { Channel } from '../schema/channel.schema';
import { Model } from 'mongoose';
import { PageInfoInterface } from '../../core';
import { BaseException, Log4j } from '../../common';
import { Injectable } from '@nestjs/common';
import { ChannelCreateDto, ChannelUpdateDto } from '../dto/channel.dto';
import { ChannelError } from '../errorCode/channel.error';

@Log4j
@Injectable()
export class ChannelService {
  private logger: Logger;
  constructor(@InjectModel(Channel.name) private readonly channelModel: Model<Channel>) {}

  async save(channel: ChannelCreateDto): Promise<any> {
    const createChannel = new this.channelModel(channel);
    const channelResult = await createChannel.save();
    this.logger.debug('[saveChannel] channelResult = ', channelResult);
    if (!channelResult.name) {
      this.logger.warn('[saveChannel] msg = ', '频道新增失败');
      throw new BaseException(ChannelError.CHANNEL_ADD_FAIL);
    }
    return {
      message: '新增频道成功',
    };
  }

  async find(pageNumber: string, pageSize: string): Promise<PageInfoInterface> {
    // 解决mongodb 分页从第0页开始
    const pageNumberInt = +pageNumber - 1 <= 0 ? 0 : +pageNumber - 1;
    const pageSizeInt = +pageSize;
    const list = await this.channelModel
      .find({})
      .where({
        isDeleted: 0,
      })
      .skip(pageNumberInt * pageSizeInt)
      .limit(pageSizeInt)
      .sort({
        updateTime: -1,
      })
      .exec();
    const total = await this.channelModel.countDocuments({});
    return {
      list,
      total,
      current: pageNumberInt,
      size: pageSizeInt,
    };
  }

  async update(channelUpdateDto: ChannelUpdateDto): Promise<any> {
    const updateResult = await this.channelModel.findByIdAndUpdate(
      {
        _id: channelUpdateDto.id,
      },
      {
        $set: channelUpdateDto,
      },
    );
    if (!updateResult.name) {
      this.logger.warn('[updateChannel] msg -> ', '频道更新失败');
      throw new BaseException(ChannelError.CHANNEL_UPDATE_FAIL);
    }

    return {
      message: '更新频道成功',
    };
  }

  async delete(channelId: string): Promise<any> {
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
    if (!deleteResult.name) {
      this.logger.warn('[deleteUser] msg -> ', '删除用户失败');
      throw new BaseException(ChannelError.CHANNEL_DELETED_FAIL);
    }
    return {
      message: '删除频道成功',
    };
  }
}
