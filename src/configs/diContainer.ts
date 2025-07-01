import { diContainer } from '@fastify/awilix';
import { asClass, asFunction } from 'awilix';
import { CardRepository } from '../modules/card/card.repository';
import { CardService } from '../modules/card/card.service';
import { PrismaService } from '../modules/database/prisma.service';
import { UserRepository } from '../modules/user/user.repository';
import { UserService } from '../modules/user/user.service';
import { ListService } from '../modules/list/list.service';
import { ListRepository } from '../modules/list/list.repository';
import { VoteRepository } from '../modules/vote/vote.repository';
import { VoteService } from '../modules/vote/vote.service';
import Fastify, { FastifyInstance } from 'fastify';
import { serverOpts } from './serverOptions';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export const createContainer = async (): Promise<FastifyInstance> => {
	const app = Fastify(serverOpts).withTypeProvider<TypeBoxTypeProvider>();

	await diContainer.register({
		app: asFunction(() => app).singleton(),
		prisma: asClass(PrismaService).singleton(),
		cardRepository: asClass(CardRepository).singleton(),
		cardService: asClass(CardService).singleton(),
		userRepository: asClass(UserRepository).singleton(),
		userService: asClass(UserService).singleton(),
		listService: asClass(ListService).singleton(),
		listRepository: asClass(ListRepository).singleton(),
		voteService: asClass(VoteService).singleton(),
		voteRepository: asClass(VoteRepository).singleton(),
		log: asFunction(() => app.log).singleton(),
	});

	return app;
};
