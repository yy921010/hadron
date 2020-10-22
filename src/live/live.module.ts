import { Module } from '@nestjs/common';
import { LiveController } from './live.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchemas } from './schema/channel.schema';
import { LiveService } from './live.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Channel.name,
        useFactory: () => {
          const schema = ChannelSchemas;
          schema.pre('save', () => console.log('pre save hook'));
          return schema;
        },
      },
    ]),
  ],
  providers: [LiveService],
  exports: [LiveService],
  controllers: [LiveController],
})
export class LiveModule {}
