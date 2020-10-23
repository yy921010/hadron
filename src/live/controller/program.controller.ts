import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProgramService } from '../services/program.service';
import { ProgramCreateDto, ProgramUpdateDto } from '../dto/program.dto';

@Controller('program')
export class ProgramController {
  constructor(private readonly programService: ProgramService) {}

  @Get()
  async getChannelByPage(@Query('pageSize') pageSize: number, @Query('pageNumber') pageNumber: number) {
    return await this.programService.find(+pageNumber, +pageSize);
  }

  @Post()
  async saveChannel(@Body() programCreateDto: ProgramCreateDto): Promise<any> {
    await this.programService.save(programCreateDto);
    return {
      message: '新增成功',
    };
  }

  @Put()
  async updateChannel(@Body() programUpdateDto: ProgramUpdateDto) {
    await this.programService.update(programUpdateDto);
    return {
      message: '更新成功',
    };
  }

  @Delete(':channelId')
  async deleteChannel(@Param() params: any) {
    await this.programService.delete(params.channelId);
    return {
      message: '删除成功',
    };
  }
}
