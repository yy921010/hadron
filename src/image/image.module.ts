import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ConfigService, CoreModule } from '../core';
import { MulterModule } from '@nestjs/platform-express';
import { BaseException } from '../common';
import { imageError } from './errorCode/image.error';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as uuid from 'uuid';
import { existsSync, mkdirSync } from 'fs';
import { Request } from 'express';
@Module({
  imports: [
    CoreModule,
    MulterModule.registerAsync({
      imports: [CoreModule],
      useFactory: (configService: ConfigService) => {
        return {
          fileFilter: (req, file, cb) => {
            const accept = 'image/gif,image/jpeg,image/jpg,image/png,image/svg';
            const accepts = accept.split(',');
            const allowFileType = accepts.find(item => item === file.mimetype);
            if (allowFileType) {
              cb(null, true);
            } else {
              cb(new BaseException(imageError.IMAGE_FILE_TYPE_ERROR), false);
            }
          },
          //图片限制
          limits: {
            fileSize: 20 * 1024 * 1024,
          },
          //存储模式
          storage: diskStorage({
            destination: (req: Request, file, cb) => {
              console.log('req', file);
              const uploadPath = configService.get('upload').basePath;
              // Create folder if doesn't exist
              if (!existsSync(uploadPath)) {
                mkdirSync(uploadPath);
              }
              cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
              cb(null, `${uuid.v4()}${extname(file.originalname)}`);
            },
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
