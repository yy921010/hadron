import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChannelService } from '../services/channel.service';
import { ChannelCreateDto, ChannelUpdateDto } from '../dto/channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async getChannelByPage(@Query('pageSize') pageSize: number, @Query('pageNumber') pageNumber: number) {
    return await this.channelService.find(+pageNumber, +pageSize);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async saveChannel(@Body() channelCreateDto: ChannelCreateDto): Promise<any> {
    await this.channelService.save(channelCreateDto);
    return {
      message: '新增成功',
    };
  }

  @Put()
  async updateChannel(@Body() channel: ChannelUpdateDto) {
    await this.channelService.update(channel);
    return {
      message: '更新成功',
    };
  }

  @Delete(':channelId')
  async deleteChannel(@Param() params: any) {
    await this.channelService.delete(params.channelId);
    return {
      message: '删除成功',
    };
  }
}
