import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import { ERRORS } from '../modules/errors/error.helper';

export const decorators: FastifyPluginAsync = fp(
	async (app: FastifyInstance, _opts): Promise<void> => {
		app.decorate('verifyJWT', async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
			app.log.info(req.headers);
			try {
				await req.jwtVerify();
			} catch {
				throw ERRORS.invalidToken;
			}
		});
	},
);
