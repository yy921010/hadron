import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(['.env.yml', '.env.dev.yml', '.env.prod.yml']),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
}
