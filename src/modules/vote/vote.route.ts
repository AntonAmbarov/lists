import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';

export const voteRoute = (app: FastifyInstance, opts: FastifyPluginOptions): void => {
	app.route({
		method: 'POST',
		url: '/',
		schema: {},
		handler: async (req: FastifyRequest<{ Body: any }>, reply: FastifyReply): void => {
			const voteData = req.body;
			// отправить данные в сервис
			// пересчитать рейтинг
			// вернуть новый рейтинг
		},
	});
};
