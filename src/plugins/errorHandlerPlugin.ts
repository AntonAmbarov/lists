import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { errorHandler, ErrorResponse } from '../modules/errors/error.helper';
import fp from 'fastify-plugin';

export const errorHandlerPlugin = fp((app: FastifyInstance) => {
	app.setErrorHandler((err: unknown, req: FastifyRequest, reply: FastifyReply) => {
		app.log.error({
			url: req.url,
			method: req.method,
			requestId: req.id,
			message: err instanceof Error ? err.message : 'Неизвестная ошибка',
			stack: err instanceof Error ? err.stack : undefined,
			code: (err as any).code,
			validation: (err as any).validation,
		});

		const appError = errorHandler(err);

		const response: ErrorResponse = {
			error: {
				message: appError.message,
				code: appError.code,
				details: appError.details,
			},
		};

		reply.status(appError.statusCode).send(response);
	});
});
