import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';
import {
	RatingDTO,
	RatingParams,
	RatingParamsSchema,
	RatingResponseSchema,
	VoteInput,
	VoteInputSchema,
} from './vote.schema';
import { IVoteService } from './vote.service.interface';

export const voteRoute = (app: FastifyInstance, _opts: FastifyPluginOptions): void => {
	app.route({
		method: 'POST',
		url: '/',
		schema: {
			body: VoteInputSchema,
			response: {
				201: RatingResponseSchema,
			},
		},
		handler: async (
			req: FastifyRequest<{ Body: VoteInput }>,
			reply: FastifyReply,
		): Promise<void> => {
			const service: IVoteService = app.diContainer.resolve('voteService');
			const resp = await service.addVote(req.body);

			reply.code(201).send(resp);
		},
	});

	app.route({
		method: 'GET',
		url: '/rating/:id',
		schema: {
			params: RatingParamsSchema,
			response: {
				200: RatingResponseSchema,
			},
		},
		handler: async (req: FastifyRequest<{ Params: RatingParams }>, reply): Promise<void> => {
			const service: IVoteService = app.diContainer.resolve('voteService');
			const res: RatingDTO | null = await service.getRating(req.params.id);
			reply.code(200).send({
				cardToListId: res?.cardToListId ?? req.params.id,
				value: res?.cardToListId ?? 0,
				updateAt: res?.updateAt ?? null,
			});
		},
	});
};
