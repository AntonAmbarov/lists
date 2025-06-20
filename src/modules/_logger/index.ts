import { CustomLogger } from './logger.service';
import { loggerOptions } from './logger.options';

export const customLogger = new CustomLogger(loggerOptions);
