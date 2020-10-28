import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '../core';
@Controller('image')
export class ImageController {
  private config: ConfigService;
  constructor(private readonly configService: ConfigService) {
    this.config = configService;
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: any) {
    return {
      mimetype: file.mimetype,
      filename: file.filename,
      path: file.path,
    };
  }
}
