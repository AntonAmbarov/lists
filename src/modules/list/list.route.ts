import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify';
import {
	AddCardToListParams,
	AddCardToListParamsSchema,
	AddCardToListResponseSchema,
	CreateListInput,
	CreateListInputSchema,
	CreateListResponseSchema,
	GetCardsByListIdParams,
	GetListByIdParams,
	GetListByIdParamsSchema,
	GetListByIdResponseSchema,
} from './list.schema';
import { IListService } from './list.service.interface';
import { ListModel, CardToListModel } from '@prisma/client';

export const listRoute = (app: FastifyInstance, _opts: FastifyPluginOptions): void => {
	const service: IListService = app.diContainer.resolve('listService');

	// создание нового списка
	app.route({
		method: 'POST',
		url: '/',
		schema: {
			body: CreateListInputSchema,
			response: {
				201: CreateListResponseSchema,
			},
		},
		handler: async (req: FastifyRequest<{ Body: CreateListInput }>, reply): Promise<void> => {
			const res: ListModel = await service.addList(req.body);

			app.log.info(res);
			reply.code(201).send(res);
		},
	});

	// запрос данных списка без карточек
	app.route({
		method: 'GET',
		url: '/:id',
		schema: {
			params: GetListByIdParamsSchema,
			response: {
				200: GetListByIdResponseSchema,
			},
		},
		handler: async (req: FastifyRequest<{ Params: GetListByIdParams }>, reply): Promise<void> => {
			app.log.info(req.params);
			const id: number = Number(req.params.id);
			const res = await service.getList(id);

			reply.code(200).send(res);
		},
	});

	// запрос карточек для списка
	app.route({
		method: 'GET',
		url: '/:id/cards/',
		// schema: {
		//     params: GetCardsByListIdParamsSchema,
		//     response: {
		//         200: GetCardsByListIdResponseSchema
		//     }
		// },
		handler: async (
			req: FastifyRequest<{ Params: GetCardsByListIdParams }>,
			reply,
		): Promise<void> => {
			const id = Number(req.params.id);
			const res = await service.getCardsByList(id);
			reply.code(200).send(res);
		},
	});

	// добавление карточки в список
	app.route({
		method: 'POST',
		url: '/:listId/cards/:cardId',
		schema: {
			params: AddCardToListParamsSchema,
			response: {
				201: AddCardToListResponseSchema,
			},
		},
		handler: async (req: FastifyRequest<{ Params: AddCardToListParams }>, reply): Promise<void> => {
			const { listId, cardId } = req.params;
			const res: CardToListModel = await service.addCardToList(listId, cardId);
			reply.code(201).send(res);
		},
	});

	// удаление карточки из списка

	// обновление списка
};
