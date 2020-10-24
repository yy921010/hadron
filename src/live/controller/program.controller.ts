import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
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
  @UsePipes(ValidationPipe)
  async saveProgram(@Body() programCreateDto: ProgramCreateDto): Promise<any> {
    return this.programService.save(programCreateDto);
  }

  @Put()
  @UsePipes(ValidationPipe)
  async updateProgram(@Body() programUpdateDto: ProgramUpdateDto) {
    return this.programService.update(programUpdateDto);
  }

  @Delete(':channelId')
  async deleteProgram(@Param() params: any) {
    return this.programService.delete(params.channelId);
  }
}
