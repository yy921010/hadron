import { Inject, Injectable } from '@nestjs/common';
import { LoggerEnum } from './logger.interface';

@Injectable()
export class LoggerService {
    constructor(@Inject(LoggerEnum.LOGGER_CLIENT) loggerClient){
        console.log('loggerClient?>>?',loggerClient)
    }
}
