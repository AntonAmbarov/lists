import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify';
import {
	CreateUserInput,
	CreateUserInputSchema,
	CreateUserResponseSchema,
	LoginUserInput,
	LoginUserInputSchema,
	LoginUserResponseSchema,
} from './user.schema';
import { IUserService } from './user.service.interface';

export const userRoute = (app: FastifyInstance, opts: FastifyPluginOptions) => {
	const service: IUserService = app.diContainer.resolve('userService');

	app.post(
		'/register',
		{
			schema: {
				body: CreateUserInputSchema,
				response: {
					201: CreateUserResponseSchema,
				},
			},
		},
		async (req: FastifyRequest<{ Body: CreateUserInput }>, reply) => {
			const data = req.body;
			const user = await service.createUser(data);

			reply.code(201).send(user);
		},
	);

	app.post(
		'/login',
		{
			schema: {
				body: LoginUserInputSchema,
				response: {
					200: LoginUserResponseSchema,
				},
			},
		},
		async (req: FastifyRequest<{ Body: LoginUserInput }>, reply) => {
			const { email, password } = req.body;
			const userData = await service.login({ email, password });

			app.log.info('логируем: ', req.body);

			reply.code(200).send(userData);
		},
	);
};
