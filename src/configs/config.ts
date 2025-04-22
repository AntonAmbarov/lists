import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';
import { schemaDotenv } from '../schemas/dotenv.schema';

export default fp(
    async function configLoader(app: FastifyInstance, _opts: any) {
        try {
            await app.register(fastifyEnv, {
                confKey: 'secrets',
                schema: schemaDotenv,
                dotenv: {
                    path: './.env',
                    debug: true
                }
            })

            app.decorate('config', {
                'DB_URL': app.secrets.DB_URL,
                'PORT': app.secrets.PORT,
                'NODE_ENV': app.secrets.NODE_ENV,
            })
        } catch (err) {
            app.log.error('Ошибка в конфиге: ', err);
            throw err;
        }
    }, { name: 'app-config' });