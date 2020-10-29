import { Module } from '@nestjs/common';
import { HelperService } from './helper.service';
import { CoreModule } from '../core';

@Module({
  imports: [CoreModule],
  providers: [HelperService],
  exports: [HelperService],
})
export class ShareModule {}
