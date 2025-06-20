import pino, { Logger, LoggerOptions, Bindings, LevelWithSilentOrString } from 'pino';
import { FastifyBaseLogger } from 'fastify';

export class CustomLogger implements FastifyBaseLogger {
	private logger: Logger;
	private _level: LevelWithSilentOrString;

	constructor(options: LoggerOptions = {}) {
		this.logger = pino(options);
		this._level = options.level || ('info' as LevelWithSilentOrString);
	}

	get level(): LevelWithSilentOrString {
		return this._level;
	}

	set level(newLevel: LevelWithSilentOrString) {
		this._level = newLevel;
	}

	child(bindings: Bindings): CustomLogger {
		const childLogger = new CustomLogger();
		childLogger.logger = this.logger.child(bindings);
		return childLogger;
	}

	fatal(obj: any, msg = '', ...args: unknown[]) {
		this.logger.fatal(obj, msg, ...args);
	}

	error(obj: unknown, msg = '', ...args: unknown[]) {
		this.logger.error(obj, msg, ...args);
	}

	warn(obj: unknown, msg = '', ...args: unknown[]) {
		this.logger.warn(obj, msg, ...args);
	}

	info(obj: unknown, msg = '', ...args: unknown[]) {
		console.log('xoxoxoxoxox');
		this.logger.info(obj, msg, ...args);
	}

	debug(obj: unknown, msg = '', ...args: unknown[]) {
		this.logger.debug(obj, msg, ...args);
	}

	trace(obj: unknown, msg = '', ...args: unknown[]) {
		this.logger.trace(obj, msg, ...args);
	}

	silent(obj: unknown, msg = '', ...args: unknown[]) {
		this.logger.silent(obj, msg, ...args);
	}
	himan(obj: unknown, msg = '', ...args: unknown[]) {
		this.logger.info('ХОХОХОХОХОХО');
	}
}
