import { configure } from 'log4js';
import * as path from 'path';
const baseLogPath = path.resolve(__dirname, '../../logs');

const logger = configure({
    appenders:{},
    categories:{}
})

export default logger;