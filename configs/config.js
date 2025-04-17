import fp from 'fastify-plugin';
import fastifyEnv from '@fastify/env';

export default fp(
    async function configLoader(app, _opts) {
        await app.register(fastifyEnv, {
            confKey: 'secrets',
            schema: app.getSchema('schema:dotenv')
        })

        app.decorate('config', {
            db: {
                url: app.secrets.DB_URL,
            }
        })
    }, { name: 'app-config' })