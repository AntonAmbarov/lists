import fp from 'fastify-plugin';
import cors from '@fastify/cors';

export default fp(
    async function (app, _opts) {
        app.register(cors, {
            origin: true
        });
    }
)