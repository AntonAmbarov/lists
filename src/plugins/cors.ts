import cors from '@fastify/cors';
import { FastifyPluginCallback } from 'fastify';

export const corsPlugin: FastifyPluginCallback = async function (app, _opts) {
    app.register(cors, {
        origin: true
    });
}
