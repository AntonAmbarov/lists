import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';
import { envSchema } from '../schemas';

export default fp(
    async function configLoader(app: FastifyInstance, _opts: any) {
        try {
            await app.register(fastifyEnv, {
                confKey: 'secrets',
                schema: envSchema,
                dotenv: {
                    path: './.env',
                    debug: true
                }
            })

            app.decorate('config', {
                dbUrl: app.secrets.DB_URL,
                port: app.secrets.PORT,
                nodeEnv: app.secrets.NODE_ENV,
            })
        } catch (err) {
            app.log.error('Ошибка в конфиге: ', err);
            throw err;
        }
    }, { name: 'app-config' });