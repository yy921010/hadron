import { Injectable } from '@nestjs/common';
import { ConfigService } from '../core';

@Injectable()
export class ImageService {
  constructor(private readonly config: ConfigService) {}
}
