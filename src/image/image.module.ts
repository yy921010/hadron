import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { CoreModule } from '../core';

@Module({
  imports: [CoreModule],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
