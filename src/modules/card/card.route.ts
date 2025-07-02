import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify';
import { CardSchema, CreateCardInputSchema, CreateCardResponseSchema } from './card.schema';
import { ICardService } from './card.service.interface';
import { CreateCardInput, CreateCardResponse } from './card.schema';
import { CardModel } from '@prisma/client';

export const cardRoute = async (app: FastifyInstance, opts: FastifyPluginOptions) => {
	const service: ICardService = app.diContainer.resolve('cardService');

	app.route({
		method: 'POST',
		url: '/',
		schema: {
			body: CreateCardInputSchema,
			response: {
				201: CreateCardResponseSchema,
			},
		},
		preHandler: app.auth([app.verifyJWT]),
		handler: async (req: FastifyRequest<{ Body: CreateCardInput }>, reply) => {
			const data = req.body;
			await service.addCard(data);
			reply.code(201).send(data);
		},
	});

	app.route({
		method: 'GET',
		url: '/',
		schema: {
			// response: CardSchema,
		},
		handler: async (req, reply) => {
			const data: Array<CardModel> = await service.getCards();
			reply.status(200).send(data);
		},
	});

	app.get('/:id', async (req, peply) => {
		// логика
	});
};
