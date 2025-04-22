import { FastifyInstance as OriginalFastifyInstance } from "fastify";

declare module 'fastify' {
    interface FastifyInstance extends OriginalFastifyInstance {
        secrets: {
            DB_URL: string;
            PORT: number;
            NODE_ENV: string;
        };
        config: {
            DB_URL: string;
            PORT: number;
            NODE_ENV: string;
        };
    }
}