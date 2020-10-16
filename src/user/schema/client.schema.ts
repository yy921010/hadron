import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Client extends Document {
  @Prop()
  userId: string;
  @Prop()
  clientName: string;
  @Prop()
  clientId: string;
  @Prop()
  scope: string;
  @Prop()
  accessTokenValidateSecond: number;
  @Prop()
  refreshTokenValidateSecond: number;
  @Prop()
  isLocked: number;
  @Prop()
  isOnline: number;
  @Prop()
  clientSecret: number;
  @Prop()
  updateTime: string;
  @Prop()
  createTime: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
