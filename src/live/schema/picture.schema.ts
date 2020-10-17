import { Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({})
export class Picture extends Document {
  name: string;
  href: string;
  imageType: string;
}
