import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LiveService } from './live.service';
import { ChannelCreateDto } from './dto/channelCreateDto';

@Controller('live')
export class LiveController {
  constructor(private readonly liveService: LiveService) {}

  @Get()
  async getUsersByPage(@Query('pageSize') pageSize: number, @Query('pageNumber') pageNumber: number) {
    return await this.liveService.find(+pageNumber, +pageSize);
  }

  @Post()
  async saveUser(@Body() channelCreateDto: ChannelCreateDto): Promise<any> {
    await this.liveService.save(channelCreateDto);
    return {
      message: '新增成功',
    };
  }
}
