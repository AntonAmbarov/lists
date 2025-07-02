import fp from 'fastify-plugin';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fastifyJwt from '@fastify/jwt';

export const jwtPlugin: FastifyPluginAsync = fp(async function (app: FastifyInstance, _opts) {
	app.register(fastifyJwt, {
		secret: app.secrets.JWT_SECRET,
	});
});
