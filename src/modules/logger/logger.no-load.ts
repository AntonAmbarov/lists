import { CustomLogger } from './logger.service';
import { loggerOptions } from '../../configs/logger.options';

export const customLogger = new CustomLogger(loggerOptions);