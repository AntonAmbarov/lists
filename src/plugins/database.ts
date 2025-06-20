import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { IPrismaService } from '../modules/database/prisma.service.interface';

export const databaseConnecting: FastifyPluginAsync = fp(async (app) => {
	const db: IPrismaService = app.diContainer.resolve('prisma');
	app.addHook('onRequest', async (req, reply) => {
		app.log.info('Коннектим БД');
		await db.connect();
	});

	app.addHook('onResponse', async (req, reply) => {
		app.log.info('Дисконектим БД');
		await db.disconnect();
	});
});
