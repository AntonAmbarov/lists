import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export type routeWrapper = (
	app: FastifyInstance,
	opts?: FastifyPluginOptions & {
		prefix: string;
	},
) => void;
