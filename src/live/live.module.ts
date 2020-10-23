import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchemas } from './schema/channel.schema';
import { ChannelService } from './services/channel.service';
import { ChannelController } from './controller/channel.controller';
import { Program, ProgramSchema } from './schema/program.schema';
import { ProgramService } from './services/program.service';
import { ProgramController } from './controller/program.controller';

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
      {
        name: Program.name,
        useFactory: () => ProgramSchema,
      },
    ]),
  ],
  providers: [ChannelService, ProgramService],
  exports: [ChannelService, ProgramService],
  controllers: [ChannelController, ProgramController],
})
export class LiveModule {}
