import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ChannelService } from '../services/channel.service';
import { ChannelCreateDto, ChannelUpdateDto } from '../dto/channel.dto';

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Get()
  async getChannelByPage(@Query('pageSize') pageSize: string, @Query('pageNumber') pageNumber: string) {
    return this.channelService.find(pageNumber, pageSize);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async saveChannel(@Body() channelCreateDto: ChannelCreateDto): Promise<any> {
    return this.channelService.save(channelCreateDto);
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateChannel(@Body() channel: ChannelUpdateDto) {
    return this.channelService.update(channel);
  }

  @Delete(':channelId')
  async deleteChannel(@Param() params: any) {
    return this.channelService.delete(params.channelId);
  }
}
