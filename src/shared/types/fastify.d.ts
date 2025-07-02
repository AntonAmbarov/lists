import { FastifyInstance as OriginalFastifyInstance } from 'fastify';

declare module 'fastify' {
	interface FastifyInstance extends OriginalFastifyInstance {
		secrets: {
			PORT: number;
			NODE_ENV: string;
			LOG_LEVEL: string;
			PRIVATE_KEY: string;
			JWT_SECRET: string;
		};
		config: {
			port: number;
			nodeEnv: string;
		};
		verifyJWT: (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
	}
}
