const isDevelopment = process.env.NODE_ENV !== 'production';

export const loggerOptions = {
	...(isDevelopment
		? {
				transport: {
					target: 'pino-pretty',
					options: { colorize: true, translateTime: 'HH:MM:ss Z', sync: true },
				},
			}
		: {}),
	redact: {
		censor: '***',
		paths: ['req.headers.authorization', 'req.body.password', 'req.body.email'],
	},
};
