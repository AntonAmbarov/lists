import cors from '@fastify/cors';
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

export const corsPlugin: FastifyPluginAsync = fp(async function (app, _opts) {
	app.register(cors, {
		origin: true,
	});
});
