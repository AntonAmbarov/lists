import fastifyAuth from '@fastify/auth';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

export const auth: FastifyPluginAsync = fp(async (app: FastifyInstance, _opts): Promise<void> => {
	app.register(fastifyAuth);
});
